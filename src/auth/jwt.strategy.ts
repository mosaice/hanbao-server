import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component } from '@nestjs/common';
import { AuthService } from './auth.service';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromHeader('access_token'),
        passReqToCallback: true,
        secretOrKey: authKey,
      },
      async (req, payload, next) => {
        console.log(payload);
        return await this.verify(req, payload, next);
      }
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}