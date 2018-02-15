import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserChannelMessage } from './UserChannelMessage';

enum booleanEnum {
  TRUE = 1,
  FALSE = 0
}

@Entity()
export class ChatChannel {
  @PrimaryGeneratedColumn({
    comment: '频道id'
  })
  id: number;


  @Column({
    type: 'varchar',
    length: 30,
    comment: '频道名称'
  })
  name: string;

  @Column('enum', {
    enum: booleanEnum,
    comment: '是否是固定频道'
  })
  fixable: number;

  /* 用户频道定位关联 */
  @OneToMany(type => UserChannelMessage, userAndChannel => userAndChannel.channel)
  messageBelongs: UserChannelMessage[]
}
