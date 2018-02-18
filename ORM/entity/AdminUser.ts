import { Entity, OneToOne, JoinColumn } from "typeorm";
import { User } from './User';
import { BaseEntity } from './BaseEnity';

@Entity()
export class AdminUser extends BaseEntity {

  /* 用户管理员关联 */
  @OneToOne(type => User, user => user.admin)
  @JoinColumn()
  user: User;


}
