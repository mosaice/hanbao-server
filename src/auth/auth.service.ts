import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

@Component()
export class AuthService {
  createToken(user) {
    const expiresIn = '7d';
    const token = jwt.sign(user, authKey, { expiresIn });

    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    console.log(signedUser)
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}