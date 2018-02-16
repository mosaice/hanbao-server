import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { UserGroup } from './UserGroup';
import { Role } from './Role';

@Entity()
export class UserGroupRole {

  @PrimaryGeneratedColumn({
    comment: '用户和组关系表id'
  })
  id: number;

  @ManyToOne(type => User, user => user.groupRoles)
  user: User

  @ManyToOne(type => UserGroup, group => group.userRoles)
  group: UserGroup

  @ManyToOne(type => Role, role => role.userAndGroups)
  role: Role

}