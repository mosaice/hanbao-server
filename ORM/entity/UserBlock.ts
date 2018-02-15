import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserBlock {

  @PrimaryGeneratedColumn({
    comment: '屏蔽项id'
  })
  id: number;

  @Column('enum', {
    enum: ['user', 'group', 'ohter'],
    comment: '屏蔽类型'
  })
  type: string;

  @Column({
    comment: '屏蔽的id'
  })
  blockId: number;

  /* 用户屏蔽关联 */
  @ManyToOne(type => User, user => user.blocks)
  user: User

}
