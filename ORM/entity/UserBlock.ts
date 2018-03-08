import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { IsPositive, IsIn } from 'class-validator';
import { BaseEntity } from './BaseEnity';

@Entity()
export class UserBlock extends BaseEntity {

  @IsIn(['user', 'group', 'ohter'])
  @Column('enum', {
    enum: ['user', 'group', 'ohter'],
    comment: '屏蔽类型',
  })
  type: string;

  @IsPositive()
  @Column({
    comment: '屏蔽的id',
  })
  blockId: number;

  /* 用户屏蔽关联 */
  @ManyToOne(type => User, user => user.blocks)
  user: User;

}
