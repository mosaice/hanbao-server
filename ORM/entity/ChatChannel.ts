import { Entity, Column, OneToMany } from 'typeorm';
import { UserChannelMessage } from './UserChannelMessage';
import { IsNotEmpty, IsString, MaxLength, IsEnum } from 'class-validator'
import { BaseEntity } from './BaseEnity';

enum booleanEnum {
  TRUE = 1,
  FALSE = 0
}

@Entity()
export class ChatChannel extends BaseEntity {

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Column({
    type: 'varchar',
    length: 30,
    comment: '频道名称'
  })
  name: string;

  @IsEnum(booleanEnum)
  @Column('enum', {
    enum: booleanEnum,
    comment: '是否是固定频道'
  })
  fixable: number;

  /* 用户频道定位关联 */
  @OneToMany(type => UserChannelMessage, userAndChannel => userAndChannel.channel)
  messageBelongs: UserChannelMessage[]
}
