import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import getOrmConfig from '../ORM/config';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig()),
    SharedModule,
    AuthModule,
    UserModule,
  ],
})
export class ApplicationModule {}
