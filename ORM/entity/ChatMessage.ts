import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserChannelMessage } from './UserChannelMessage';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn({
    comment: '消息id'
  })
  id: number;

  @Column({
    type: 'varchar',
    comment: '消息内容'
  })
  content: string;

  @ManyToOne(type => UserChannelMessage, belong => belong.messages)
  belong: UserChannelMessage
}
