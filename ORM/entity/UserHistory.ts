import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { IsNotEmpty, IsString, MaxLength, IsIn, IsPositive } from 'class-validator'
import { BaseEntity } from './BaseEnity';


@Entity()
export class UserHistory extends BaseEntity {

  @IsIn(['user', 'group', 'post'])
  @Column('enum', {
    enum: ['user', 'group', 'post'],
    comment: '操作对象'
  })
  target: string;

  @IsPositive()
  @Column({
    comment: '对象的id'
  })
  targetId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Column({
    type: 'varchar',
    length: 30,
    comment: '操作动作'
  })
  action: string;

  /* 用户历史记录关系 */
  @ManyToOne(type => User, user => user.histories)
  user: User



}
