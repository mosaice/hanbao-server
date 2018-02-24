import * as jwt from 'jsonwebtoken';
import { User } from '../../ORM/entity/User';
import { InjectRepository } from '@nestjs/typeorm'
import { Component } from '@nestjs/common';
import { Repository } from 'typeorm';

@Component()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createToken(user) {
    const expiresIn = '7d';
    const token = jwt.sign(user, authKey, { expiresIn });

    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: signedUser.id,
        email: signedUser.email,
        name: signedUser.name,
      }
    });
    return !!user
  }
}