import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserSubscribe {

  @PrimaryGeneratedColumn({
    comment: '订阅id'
  })
  id: number;

  @Column('enum', {
    enum: ['user', 'group', 'post'],
    comment: '订阅类型'
  })
  type: string;

  @Column({
    comment: '订阅的id'
  })
  subScribeId: number;

  /* 用户订阅关联 */
  @ManyToOne(type => User, user => user.subscribes)
  user: User

}
