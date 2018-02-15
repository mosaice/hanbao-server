import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { ChatChannel } from './ChatChannel';
import { ChatMessage } from './ChatMessage';

@Entity()
export class UserChannelMessage {
  @PrimaryGeneratedColumn({
    comment: '关系id'
  })
  id: number;

  /* 用户定位关系 */
  @ManyToOne(type => User, user => user.messageBelongs)
  user: User

  /* 频道定位关系 */
  @ManyToOne(type => ChatChannel, channel => channel.messageBelongs)
  channel: ChatChannel

  @OneToMany(type => ChatMessage, message => message.belong)
  messages: ChatMessage[]

}
