import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import getOrmConfig from '../ORM/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig())
  ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
