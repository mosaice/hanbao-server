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
import * as redis from 'redis';

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
    redisClient: {
      set: jest.fn().mockImplementation((hash, data, ex, exTime) => {
        redisStore[hash] = {
          data,
          ex,
          exTime,
        };
      }),
    },
  };

  const authService = {};

  const redisStore = {};

  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let userGroupRepository: Repository<UserGroup>;
  let userGroupRoleRepository: Repository<UserGroupRole>;

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
    userRepository = getConnection('TestDB').getRepository<User>(User);
    roleRepository = getConnection('TestDB').getRepository<Role>(Role);
    userGroupRepository = getConnection('TestDB').getRepository<UserGroup>(UserGroup);
    userGroupRoleRepository = getConnection('TestDB').getRepository<UserGroupRole>(UserGroupRole);
  });

  afterEach(async () => {
    await userRepository.query('DELETE FROM user');
    await userRepository.query('DELETE FROM role');
    await userRepository.query('DELETE FROM user_group');
    await userRepository.query('DELETE FROM user_group_role');
    // await roleRepository.query('DELETE FROM user');
    // await userGroupRepository.query('DELETE FROM user');
    // await userGroupRoleRepository.query('DELETE FROM user');
  });

  describe('setup', () => {
    it('should all service be defined', async () => {
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
      userService.registerUser(account).then(data => {
        expect(data).toBeUndefined();
        expect(bcryptService.hash).toBeCalledWith('test@test.com');
        expect(redisService.redisClient.set).toBeCalledWith('somehash', JSON.stringify(account), 'EX', 1800);
        expect(mailService.registerMail).toBeCalledWith({
          to: 'test@test.com',
          link: 'http://localhost:3000/api/v1/user/register?userKey=somehash',
        });
      });
    });
  });

});