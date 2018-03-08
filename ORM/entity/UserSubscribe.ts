import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { IsPositive, IsIn } from 'class-validator';
import { BaseEntity } from './BaseEnity';

@Entity()
@CreateDateColumn()
export class UserSubscribe extends BaseEntity {

  @IsIn(['user', 'group', 'post'])
  @Column('enum', {
    enum: ['user', 'group', 'post'],
    comment: '订阅类型',
  })
  type: string;

  @IsPositive()
  @Column({
    comment: '订阅的id',
  })
  subScribeId: number;

  /* 用户订阅关联 */
  @ManyToOne(type => User, user => user.subscribes)
  user: User;

}
