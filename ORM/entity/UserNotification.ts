import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
@Entity()
export class UserNotification {
  @PrimaryGeneratedColumn({
    comment: '消息id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '消息类型'
  })
  type: string;

  @Column({
    comment: '消息来源'
  })
  sourceId: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '操作动作'
  })
  action: string;

  /* 用户关系 */
  @ManyToOne(type => User, user => user.notifications)
  user: User
}
