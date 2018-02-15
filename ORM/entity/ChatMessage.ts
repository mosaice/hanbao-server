import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserNotification {
  @PrimaryGeneratedColumn({
    comment: '消息id'
  })
  id: number;

  @Column({
    type: 'varchar',
    comment: '消息内容'
  })
  content: string;
}
