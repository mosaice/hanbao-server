import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from './User';

@Entity()
export class AdminUser {

  @PrimaryGeneratedColumn({
    comment: '管理员id'
  })
  id: number;

  /* 用户管理员关联 */
  @OneToOne(type => User, user => user.admin)
  @JoinColumn()
  user: User;


}
