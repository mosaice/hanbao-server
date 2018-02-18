import { Entity, Column, ManyToOne } from 'typeorm';
import { UserChannelMessage } from './UserChannelMessage';
import { IsString } from 'class-validator'
import { BaseEntity } from './BaseEnity';

@Entity()
export class ChatMessage extends BaseEntity {

  @IsString()
  @Column({
    type: 'varchar',
    comment: '消息内容'
  })
  content: string;

  @ManyToOne(type => UserChannelMessage, belong => belong.messages)
  belong: UserChannelMessage
}
