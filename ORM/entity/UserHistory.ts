import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserHistory {

  @PrimaryGeneratedColumn({
    comment: '历史操作id'
  })
  id: number;

  @Column('enum', {
    enum: ['user', 'group', 'post'],
    comment: '操作对象'
  })
  target: string;

  @Column({
    comment: '屏蔽的id'
  })
  blockId: number;

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
