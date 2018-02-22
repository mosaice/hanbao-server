import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

import getOrmConfig from '../ORM/config';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig()),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
})
export class ApplicationModule {}
