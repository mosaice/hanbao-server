import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
