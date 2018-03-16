import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Repository } from 'typeorm';
import { User } from '../../ORM/entity/User';
import { UserGroupRole } from '../../ORM/entity/UserGroupRole';
import { UserGroup } from '../../ORM/entity/UserGroup';
import { Role } from '../../ORM/entity/Role';

import { MailService } from '../shared/mail.service';
import { BcryptService } from '../shared/bcrypt.service';
import { RedisService } from '../shared/redis.service';
import { AuthService } from '../auth/auth.service';
jest.mock('../shared/mail.service');
jest.mock('../shared/bcrypt.service');
jest.mock('../shared/redis.service');
jest.mock('../auth/auth.service');

describe('UserController', () => {
  let userService: UserService;
  const mailService = {
    registerMail: jest.fn(),
    passwordMail: jest.fn(),
  };

  const bcryptService = {
    hash: jest.fn().mockImplementation(() => 'some hash'),
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

  let authService: AuthService;

  // class UserRepository extends Repository<User> {}
  // class RoleRepository extends Repository<Role> {}
  // class UserGroupRepository extends Repository<UserGroup> {}
  // class UserGroupRoleRepository extends Repository<UserGroupRole> {}

  const userRepository = {};
  const roleRepository = {};
  const userGroupRepository = {};
  const userGroupRoleRepository = {};
  const redisStore = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      components: [
        UserService,
        BcryptService,
        AuthService,
        MailService,
        RedisService,
        {
          provide: 'UserRepository',
          useValue: userRepository as Repository<User>,
        },
        {
          provide: 'RoleRepository',
          useValue: roleRepository as Repository<Role>,
        },
        {
          provide: 'UserGroupRepository',
          useValue: userGroupRepository as Repository<UserGroup>,
        },
        {
          provide: 'UserGroupRoleRepository',
          useValue: userGroupRoleRepository as Repository<UserGroupRole>,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);

    // redisService = module.get<RedisService>(RedisService);
    authService = module.get<AuthService>(AuthService);

    // userRepository = module.get<UserRepository>(UserRepository);
    // roleRepository = module.get<RoleRepository>(RoleRepository);
    // userGroupRepository = module.get<UserGroupRepository>(UserGroupRepository);
    // userGroupRoleRepository = module.get<UserGroupRoleRepository>(UserGroupRoleRepository);
  });

  describe('setup', () => {
    it('should all service be defined', async () => {
      expect(userService).toBeDefined();
      expect(mailService).toBeDefined();
      expect(bcryptService).toBeDefined();
      expect(redisService).toBeDefined();
      expect(authService).toBeDefined();
    });
  });

  describe('registerUser', () => {
    const account = { email: 'test', name: 'test', password: 'test'};

    interface QueryBuild {
      createQueryBuilder: any;
      where: any;
      orWhere: any;
      getOne: any;
    }

    beforeAll(() => {
      (userRepository as QueryBuild).createQueryBuilder = jest.fn().mockImplementation(() => userRepository);
      (userRepository as QueryBuild).where = jest.fn().mockImplementation(() => userRepository);
      (userRepository as QueryBuild).orWhere = jest.fn().mockImplementation(() => userRepository);
    });

    it('should throw error', async () => {
      (userRepository as QueryBuild).getOne = jest.fn().mockImplementation(() => Promise.resolve({ user: 'test'}));

      userService.registerUser(account).catch(e => {
        expect((userRepository as QueryBuild).createQueryBuilder).toHaveBeenCalledTimes(1);
        expect((userRepository as QueryBuild).createQueryBuilder).toHaveBeenCalledWith('user');

        expect((userRepository as QueryBuild).where).toHaveBeenCalledTimes(1);
        expect((userRepository as QueryBuild).where).toHaveBeenCalledWith('user.email = :email', account);

        expect((userRepository as QueryBuild).where).toHaveBeenCalledTimes(1);
        expect((userRepository as QueryBuild).orWhere).toHaveBeenCalledWith('user.name = :name', account);

        expect((userRepository as QueryBuild).getOne).toHaveBeenCalledTimes(1);

        expect(e.message).toEqual(
          { statusCode: 400,
            error: 'Bad Request',
            message: 'Email or Name exist !' });
      });

    });

    it('should send email and save hash key', async () => {
      (userRepository as QueryBuild).getOne = jest.fn().mockImplementation(() => Promise.resolve());

      userService.registerUser(account).then(() => {
        expect(bcryptService.hash).toHaveBeenCalledTimes(1);
        expect(bcryptService.hash).toHaveBeenCalledWith('test');

      });

    });

  });

});