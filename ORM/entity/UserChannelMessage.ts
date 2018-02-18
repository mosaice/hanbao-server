import { Entity, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from './User';
import { ChatChannel } from './ChatChannel';
import { ChatMessage } from './ChatMessage';
import { BaseEntity } from './BaseEnity';

@Entity()
@Index(['user', 'channel'], { unique: true })
export class UserChannelMessage extends BaseEntity {

  /* 用户定位关系 */
  @ManyToOne(type => User, user => user.messageBelongs)
  user: User

  /* 频道定位关系 */
  @ManyToOne(type => ChatChannel, channel => channel.messageBelongs)
  channel: ChatChannel

  @OneToMany(type => ChatMessage, message => message.belong)
  messages: ChatMessage[]

}
