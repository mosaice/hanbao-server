import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Repository, getConnection } from 'typeorm';
import getOrmConfig from '../../ORM/config';

import { User } from '../../ORM/entity/User';
import { Role } from '../../ORM/entity/Role';
import { UserGroup } from '../../ORM/entity/UserGroup';
import { UserGroupRole } from '../../ORM/entity/UserGroupRole';

import { MailService } from '../shared/mail.service';
import { BcryptService } from '../shared/bcrypt.service';
import { RedisService } from '../shared/redis.service';
import { AuthService } from '../auth/auth.service';
import { password } from '../shared/template/password';

describe('UserController', () => {
  let userService: UserService;
  const mailService = {
    registerMail: jest.fn(),
    passwordMail: jest.fn(),
  };

  const bcryptService = {
    hash: jest.fn().mockImplementation(() => 'somehash'),
  };

  const redisService = {
    getAsync: jest.fn().mockImplementation((hash) => redisStore[hash]),
    redisClient: {
      set: jest.fn().mockImplementation((hash, data, ex, exTime) => {
        redisStore[hash] = {
          data,
          ex,
          exTime,
        };
      }),
      del: jest.fn().mockImplementation((hash) => redisStore[hash] = undefined),
    },
  };

  const authService = {
    createToken: jest.fn().mockImplementation(() => 'jwtoken'),
  };

  const redisStore = {};

  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let userGroupRepository: Repository<UserGroup>;
  let   userGroupRoleRepository: Repository<UserGroupRole>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      components: [
        UserService,
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: BcryptService,
          useValue: bcryptService,
        },
        {
          provide: MailService,
          useValue: mailService,
        },
        {
          provide: RedisService,
          useValue: redisService,
        },
      ],
      imports: [
        TypeOrmModule.forRoot(getOrmConfig()),
        TypeOrmModule.forFeature([
          User,
          UserGroupRole,
          UserGroup,
          Role,
        ]),
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    const connection = getConnection();
    userRepository = connection.getRepository<User>(User);
    roleRepository = connection.getRepository<Role>(Role);
    userGroupRepository = connection.getRepository<UserGroup>(UserGroup);
    userGroupRoleRepository = connection.getRepository<UserGroupRole>(UserGroupRole);

  });

  afterEach(async () => {
    await userRepository.query('DELETE FROM user_group_role');
    await userRepository.query('DELETE FROM user');
    await userRepository.query('DELETE FROM user_group');
    await userRepository.query('DELETE FROM role');
  });

  describe('setup', () => {
    it('should all service be defined', () => {
      expect(userService).toBeDefined();
    });
  });

  describe('registerUser', () => {
    const account = { email: 'test@test.com', name: 'test', password: '123456789'};

    it('should throw error when email exit', async () => {
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'no test', password: '123456789'});
      await userRepository.save(testUser);
      userService.registerUser(account).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Email or Name exist !' });
      });
    });

    it('should throw error when name exit', async () => {
      const testUser = await userRepository.create({ email: 'notest@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);
      userService.registerUser(account).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Email or Name exist !' });
      });
    });

    it('should send register email with hash key', async () => {
      expect(await userService.registerUser(account)).toBeUndefined();
      expect(bcryptService.hash).toBeCalledWith('test@test.com');
      expect(redisService.redisClient.set).toBeCalledWith('somehash', JSON.stringify(account), 'EX', 1800);
      expect(mailService.registerMail).toBeCalledWith({
        to: 'test@test.com',
        link: 'http://localhost:3000/api/v1/user/register?userKey=somehash',
      });
    });
  });

  describe('createUser', () => {
    const account = { email: 'test@test.com', name: 'test', password: '123456789'};

    it('should throw error when hashkey not found in redis', () => {

      userService.createUser('').catch(e => {
        expect(e.message).toEqual(
          { statusCode: 404,
            error: 'Not Found',
            message: 'userKey not found',
          });
      });
    });

    it('should create user userGroup userGroupRelation and delete redis key', async () => {
      const role = await roleRepository.create({
        name: 'privateOwner',
      });

      await roleRepository.save(role);
      (redisStore as any).hash = JSON.stringify(account);
      expect(await userService.createUser('hash')).toBeUndefined();
      expect((redisStore as any).hash).toBeUndefined();

      const user = await userRepository.findOne({
        where: { email: 'test@test.com', name: 'test' },
      });

      expect(user).toBeDefined();

      const group = await userGroupRepository.findOne({
        where: {
          viewPermission: 'public',
          name: 'test\'s group',
          description: 'test\'s group',
        },
      });
      expect(group).toBeDefined();

      const relation = await userGroupRoleRepository.findOne({
        where: { user, group },
        relations: ['role'],
      });

      expect(relation).toBeDefined();
      expect(relation.role.name).toBe('privateOwner');

    });

  });

  describe('signIn', () => {

    it('should throw error when email not found', async () => {
      const dto = { email: 'test1@test.com', password: '123456789' };
      const testUser = await userRepository.create({ email: 'notest@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      userService.signIn(dto).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Email or Password error!',
          });
      });
    });

    it('should throw error when password error', async () => {
      const dto = { email: 'test@test.com', password: '123456789' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '1234567890'});
      await userRepository.save(testUser);

      userService.signIn(dto).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Email or Password error!',
          });
      });
    });

    it('should signin and return user info jwt', async () => {
      const dto = { email: 'test@test.com', password: '123456789' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      const res = await userService.signIn(dto);
      expect(res).toEqual({
        id: 6,
        loginCount: 1,
        name: 'test',
        sex: 'unknown',
        avator: 'https://static.hdslb.com/images/member/noface.gif',
        description: '这个人贼鸡儿懒，它什么都没写！',
        email: 'test@test.com',
        jwtoken: 'jwtoken',
      });

      expect(authService.createToken).toBeCalledWith({
        id: 6,
        name: 'test',
        email: 'test@test.com',
      });
    });

  });

  describe('getProfile', () => {

    it('should get user profile', async () => {
      const dto = { id: 7, email: 'test@test.com', name: 'test' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      const res = await userService.getProfile(dto);
      expect(res).toEqual({
        id: 7,
        loginCount: 0,
        name: 'test',
        sex: 'unknown',
        avator: 'https://static.hdslb.com/images/member/noface.gif',
        description: '这个人贼鸡儿懒，它什么都没写！',
        email: 'test@test.com',
      });
    });

    it('should return undefind when user not exist', async () => {
      const dto = { id: 6, email: 'test@test.com', name: 'test' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      const res = await userService.getProfile(dto);
      expect(res).toBeUndefined();
    });

  });

  describe('updateProfile', () => {

    it('should update success', async () => {
      const dto = { id: 9, email: 'test@test.com', name: 'test' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      expect(await userService.updateProfile(dto, { sex: 'male'})).toBeUndefined();
      expect(await userRepository.findOneById(9, {select: ['sex']})).toEqual({
        sex: 'male',
      });

      expect(await userService.updateProfile(dto, { sex: 'female'})).toBeUndefined();
      expect(await userRepository.findOneById(9, {select: ['sex']})).toEqual({
        sex: 'female',
      });

      expect(await userService.updateProfile(dto, { sex: 'unknown'})).toBeUndefined();
      expect(await userRepository.findOneById(9, {select: ['sex']})).toEqual({
        sex: 'unknown',
      });

      expect(await userService.updateProfile(dto, { sex: 'male', description: 'test'})).toBeUndefined();
      expect(await userRepository.findOneById(9, {select: ['sex', 'description']})).toEqual({
        sex: 'male',
        description: 'test',
      });

      expect(await userService.updateProfile(dto, { description: 'male', avator: 'test'})).toBeUndefined();
      expect(await userRepository.findOneById(9, {select: ['description', 'avator']})).toEqual({
        description: 'male',
        avator: 'test',
      });

    });
  });

  describe('sendResetMail', () => {

    it('should invoke send mail when email exist', async () => {
      const dto = 'test@test.com';
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      expect(await userService.sendResetMail(dto)).toBeUndefined();
      expect(bcryptService.hash).toBeCalledWith(dto);
      expect(redisService.redisClient.set).toBeCalledWith('somehash', dto, 'EX', 1800);
      expect(mailService.passwordMail).toBeCalledWith({
        to: dto,
        link: `http://localhost:4200/user/reset?userKey=somehash`,
      });
      expect(bcryptService.hash).toHaveBeenCalledTimes(2);
      expect(redisService.redisClient.set).toHaveBeenCalledTimes(2);
      expect(mailService.passwordMail).toHaveBeenCalledTimes(1);
    });

    it('should not invoke send mail when email not exist', async () => {
      const dto = 'test1@test.com';
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      expect(await userService.sendResetMail(dto)).toBeUndefined();
      expect(bcryptService.hash).toHaveBeenCalledTimes(2);
      expect(redisService.redisClient.set).toHaveBeenCalledTimes(2);
      expect(mailService.passwordMail).toHaveBeenCalledTimes(1);
    });
  });

  describe('resetAccount', () => {

    it('should return error when email not in redis', async () => {
      const dto = { userKey: '', password: '123456789' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      userService.resetAccount(dto).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 404,
            error: 'Not Found',
            message: 'userKey not found',
          });

        expect(redisService.getAsync).toBeCalledWith('');
      });

    });

    it('should reset password and delete redis key when email exist', async () => {
      const dto = { userKey: 'hash', password: '123123123' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      (redisStore as any).hash = 'test@test.com';
      expect(testUser.validatePassword('123456789')).toBeTruthy();
      expect(await userService.resetAccount(dto)).toBeUndefined();
      expect(redisService.redisClient.del).toBeCalledWith('hash');

      const user = await userRepository.findOneById(13);
      expect(user.password).toBe('somehash');
      expect((redisStore as any).hash).toBeUndefined();
      expect(redisService.redisClient.del).toBeCalledWith('hash');
      expect(bcryptService.hash).toBeCalledWith('123123123');
    });

  });

  describe('validateUser', () => {

    it('should return error when email exist', async () => {
      const dto = { email: 'test@test.com' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      userService.validateUser(dto).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Email or Name exist !',
          });
      });

    });

    it('should return undefined when email not exist', async () => {
      const dto = { email: 'test@test.com' };

      expect(await userService.validateUser(dto)).toBeUndefined();

    });

    it('should return error when name exist', async () => {
      const dto = { name: 'test' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      userService.validateUser(dto).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Email or Name exist !',
          });
      });

    });

    it('should return undefined when name not exist', async () => {
      const dto = { name: 'test' };

      expect(await userService.validateUser(dto)).toBeUndefined();

    });
  });

  describe('updatePassword', () => {

    it('should return error', async () => {
      const dto = { id: 16, email: 'test@test.com', name: 'test' };

      const pwd = { oldPassword: '123456789', newPassword: '123456789'};

      userService.updatePassword(dto, pwd).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Password invalid!',
          });
      });

      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});
      await userRepository.save(testUser);

      userService.updatePassword(dto, pwd).catch(e => {
        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Password invalid!',
          });
      });

    });

    it('should updatePassword success', async () => {
      const dto = { id: 17, email: 'test@test.com', name: 'test' };
      const testUser = await userRepository.create({ email: 'test@test.com', name: 'test', password: '123456789'});

      await userRepository.save(testUser);
      const pwd = { oldPassword: '123456789', newPassword: '123123123'};

      expect(await userService.updatePassword(dto, pwd)).toBeUndefined();
      expect(bcryptService.hash).toBeCalledWith('123123123');

      const user = await userRepository.findOneById(17);
      expect(user.password).toBe('somehash');

    });

  });
});