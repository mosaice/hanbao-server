import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { IsNotEmpty, IsString, MaxLength, IsPositive } from 'class-validator'
import { BaseEntity } from './BaseEnity';

@Entity()
export class UserNotification extends BaseEntity {

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Column({
    type: 'varchar',
    length: 30,
    comment: '消息类型'
  })
  type: string;

  @IsPositive()
  @Column({
    comment: '消息来源'
  })
  sourceId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
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
