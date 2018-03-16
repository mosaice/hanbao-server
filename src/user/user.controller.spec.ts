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
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(
      {} as Repository<User>,
      {} as Repository<Role>,
      {} as Repository<UserGroup>,
      {} as Repository<UserGroupRole>,
      {} as MailService,
      {} as AuthService,
      {} as BcryptService,
      {} as RedisService,
    );
    userController = new UserController(userService);
  });

  describe('signIn', () => {
    it('should return an user profile with token', async () => {
      const result = { email: 'test', name: 'test', jwtoekn: {}};
      jest.spyOn(userService, 'signIn').mockImplementation(() => result);
      const accout = { email: 'test', password: 'test'};
      expect(await userController.signIn(accout)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return success message', async () => {

      jest.spyOn(userService, 'registerUser').mockImplementation(() => Promise.resolve());
      const accout = { email: 'test', name: 'test', password: 'test'};
      expect(await userController.create(accout)).toBe('邮件已发送，请检查邮箱');
    });
  });

  describe('validate', () => {
    it('should return noting', async () => {

      jest.spyOn(userService, 'validateUser').mockImplementation(() => {});
      const accout = { email: 'test', name: 'test'};
      expect(await userController.validate(accout)).toBeUndefined();
    });
  });

  describe('registerAccount', () => {
    it('should return success message', async () => {

      jest.spyOn(userService, 'createUser').mockImplementation(() => {});
      expect(await userController.registerAccount('SOME KEY')).toBe('注册成功');
    });
  });

  describe('getProfile', () => {
    it('should return user message', async () => {
      const result = { id: 1, email: 'test', name: 'test', othermessage: 'something'};
      jest.spyOn(userService, 'getProfile').mockImplementation(() => result);
      const accout = { id: 1, name: 'test', email: 'test'};
      expect(await userController.getProfile(accout)).toBe(result);
    });
  });

  describe('updateProfile', () => {
    it('should return undefined', async () => {
      jest.spyOn(userService, 'updateProfile').mockImplementation(() => () => Promise.resolve());
      const accout = { id: 1, name: 'test', email: 'test'};
      const body = {description: 'something'};
      expect(await userController.updateProfile(body, accout)).toBeUndefined();
    });

    it('should return undefined when body is empty', async () => {
      jest.spyOn(userService, 'updateProfile').mockImplementation(() => () => Promise.resolve());
      const accout = { id: 1, name: 'test', email: 'test'};
      const body = {};
      expect(await userController.updateProfile(body, accout)).toBeUndefined();
    });
  });

  describe('updatePassword', () => {
    it('should return undefined', async () => {
      jest.spyOn(userService, 'updatePassword').mockImplementation(() => () => Promise.resolve());
      const accout = { id: 1, name: 'test', email: 'test'};
      const body = {oldPassword: 'something', newPassword: 'otherting'};
      expect(await userController.updatePassword(body, accout)).toBeUndefined();
    });
  });

  describe('resetPassword', () => {
    it('should return success message', async () => {
      jest.spyOn(userService, 'sendResetMail').mockImplementation(() => () => {});
      const accout = { email: 'test'};
      expect(await userController.resetPassword(accout)).toBe('邮件已发送，请检查邮箱');
    });
  });

  describe('resetAccount', () => {
    it('should return undefined', async () => {
      jest.spyOn(userService, 'resetAccount').mockImplementation(() => () => {});
      const accout = { password: 'test', userKey: 'mockkey'};
      expect(await userController.resetAccount(accout)).toBeUndefined();
    });
  });

});