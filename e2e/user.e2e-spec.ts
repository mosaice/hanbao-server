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
      })
      .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/GET register`, () => {
    return request(server)
      .get('/user/register')
      .expect(200)
      .expect('注册成功');
  });
});
