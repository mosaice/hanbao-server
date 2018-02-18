import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

import getOrmConfig from '../ORM/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig()),
    AuthModule
  ],
  controllers: [AppController],
})
export class ApplicationModule {}
