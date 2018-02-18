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
import { AuthController } from './auth.controller';
import { unless } from '../utils/helper';

@Global()
@Module({
  components: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(unless(['/auth/authorized'],passport.authenticate('jwt', { session: false })))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}