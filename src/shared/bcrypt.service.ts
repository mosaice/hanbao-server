import { Component } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Component()
export class BcryptService {
  salt: string;

  constructor() {
    this.salt = bcrypt.genSaltSync(10);
  }

  hash(plain: string): string {
    return bcrypt.hashSync(plain, this.salt);
  }

  compare(plain: string, encryption: string): boolean {
    return bcrypt.compareSync(plain, encryption);
  }

}