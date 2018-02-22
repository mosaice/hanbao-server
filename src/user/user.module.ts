import {
  Module,
  Global
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../ORM/entity/User';
import { MailService } from './mail.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [MailService, UserService],
  controllers: [UserController],
  exports: []
})
export class UserModule {}