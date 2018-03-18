import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';

describe('User', () => {
  const server = express();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
        imports: [UserModule],
      })
      .overrideComponent('UserRepository')
      .useValue({})
      .overrideComponent('RoleRepository')
      .useValue({})
      .overrideComponent('UserGroupRepository')
      .useValue({})
      .overrideComponent('UserGroupRoleRepository')
      .useValue({})
      .overrideComponent(UserService)
      .useValue({
        createUser: () => {},
        registerUser: () => {},
        validateUser: () => {},
        updateProfile: () => {},
        updatePassword: () => {},
        sendResetMail: () => {},
        resetAccount: () => {},
        getProfile: v => Promise.resolve(v),
        signIn: v => Promise.resolve(v),
      })
      .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/POST signIn`, () => {
    return request(server)
      .post('/user/signin')
      .send({ email: 'test@test.com', password: '123123123'})
      .expect(201)
      .expect({ email: 'test@test.com', password: '123123123'});
  });

  it(`/POST  success return value`, () => {
    return request(server)
      .post('/user')
      .send({ email: 'test@test.com', password: '123123123', name: 'test'})
      .expect(201)
      .expect('邮件已发送，请检查邮箱');
  });

  it(`/POST  validate`, () => {
    return request(server)
      .post('/user/validate')
      .send({ email: 'test@test.com', name: 'test'})
      .expect(201);
  });

  it(`/GET register`, () => {
    return request(server)
      .get('/user/register')
      .expect(200)
      .expect('注册成功');
  });

  it(`/GET profile`, () => {
    return request(server)
      .get('/user/profile')
      .expect(200);
  });

  it(`/patch profile`, () => {
    return request(server)
      .patch('/user/profile')
      .send({ sex: 'male'})
      .expect(200);
  });

  it(`/patch password`, () => {
    return request(server)
      .patch('/user/password')
      .send({oldPassword: '12312313', newPassword: '123123123'})
      .expect(200);
  });

  it(`/Post password`, () => {
    return request(server)
      .post('/user/password')
      .send({email: 'test@test.com'})
      .expect(201)
      .expect('邮件已发送，请检查邮箱');
  });

  it(`/Post reset`, () => {
    return request(server)
      .post('/user/reset')
      .send({password: '123123123', userKey: '123123123123'})
      .expect(201);
  });
});
