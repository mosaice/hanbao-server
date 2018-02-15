import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserHistory {

  @PrimaryGeneratedColumn({
    comment: '历史操作id'
  })
  id: number;

  @Column({
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



}
