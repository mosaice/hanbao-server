import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { AdminUser } from './AdminUser';
import { Comment } from './Comment';
import { UserHistory } from './UserHistory';
import { UserBlock } from './UserBlock';
import { UserSubscribe } from './UserSubscribe';
import { UserNotification } from './UserNotification';
import { UserChannelMessage } from './UserChannelMessage';

@Entity()
export class User {

  @PrimaryGeneratedColumn({
    comment: '用户id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '注册登陆用邮箱'
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    select: false,
    comment: '加密过密码'    
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '个性昵称'
  })
  name: string;

  @Column({
    default: '这个人贼鸡儿懒，它什么都没写！',
    comment: '个人描述'    
  })
  description: string;

  @Column({
    default: 'https://account.bilibili.com/account/face/upload',
    comment: '头像'
  })
  avator: string;

  @Column('enum', {
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
    comment: '性别'
  })
  sex: string;

  @Column({
    comment: '登陆次数'
  })
  loginCount: number;

  /* 用户管理员关联 */
  @OneToOne(type => AdminUser, admin => admin.user)
  admin: AdminUser

  /* 用户评论关联 */
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[]

  /* 用户历史关联 */
  @OneToMany(type => UserHistory, history => history.user)
  histories: UserHistory[]

  /* 用户屏蔽关联 */
  @OneToMany(type => UserBlock, block => block.user)
  blocks: UserHistory[]

  /* 用户订阅关联 */
  @OneToMany(type => UserSubscribe, subscribe => subscribe.user)
  subscribes: UserSubscribe[]

  /* 用户消息关联 */
  @OneToMany(type => UserNotification, notification => notification.user)
  notifications: UserNotification[]

  /* 用户频道定位关联 */
  @OneToMany(type => UserChannelMessage, userAndChannel => userAndChannel.user)
  messageBelongs: UserChannelMessage[]


}