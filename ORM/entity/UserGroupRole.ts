import { Entity, ManyToOne, Index } from 'typeorm';
import { User } from './User';
import { UserGroup } from './UserGroup';
import { Role } from './Role';
import { BaseEntity } from './BaseEnity';

@Entity()
@Index(['user', 'group'], { unique: true })
export class UserGroupRole extends BaseEntity {

  @ManyToOne(type => User, user => user.groupRoles)
  user: User;

  @ManyToOne(type => UserGroup, group => group.userRoles)
  group: UserGroup;

  @ManyToOne(type => Role, role => role.userAndGroups)
  role: Role;

}