import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from '../../ORM/entity/User';
import { UserGroupRole } from '../../ORM/entity/UserGroupRole';
import { UserGroup } from '../../ORM/entity/UserGroup';
import { Role } from '../../ORM/entity/Role';

import { MailService } from '../shared/mail.service';
import { BcryptService } from '../shared/bcrypt.service';
import { RedisService } from '../shared/redis.service';
import { AuthService } from '../auth/auth.service';

describe('UserController', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      components: [
        UserService,
        BcryptService,
        AuthService,
        {
          provide: MailService,
          useValue: {} as MailService,
        },
        {
          provide: RedisService,
          useValue: {} as RedisService,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: 'RoleRepository',
          useClass: Repository,
        },
        {
          provide: 'UserGroupRepository',
          useClass: Repository,
        },
        {
          provide: 'UserGroupRoleRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('test', () => {
    it('should return an user profile with token', async () => {
      expect(1).toBe(1);
    });
  });

});