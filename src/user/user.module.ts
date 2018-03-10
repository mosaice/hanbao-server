import {
  Module,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { User } from '../../ORM/entity/User';
import { UserGroupRole } from '../../ORM/entity/UserGroupRole';
import { UserGroup } from '../../ORM/entity/UserGroup';
import { Role } from '../../ORM/entity/Role';
@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    UserGroupRole,
    UserGroup,
    Role,
  ])],
  components: [UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}