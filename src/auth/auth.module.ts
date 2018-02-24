import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
  Global
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../ORM/entity/User';
import { unless } from '../utils/helper';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(
        unless(
          [
            '/user',
          ],
          passport.authenticate('jwt', { session: false })
        )
      )
      .forRoutes(
        { path: '/user/profile', method: RequestMethod.ALL },
        { path: '/user/password', method: RequestMethod.PATCH },
      );
  }
}