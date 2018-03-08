import { Entity, Column, OneToOne, OneToMany, ManyToMany, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import { AdminUser } from './AdminUser';
import { Comment } from './Comment';
import { UserHistory } from './UserHistory';
import { UserBlock } from './UserBlock';
import { UserSubscribe } from './UserSubscribe';
import { UserNotification } from './UserNotification';
import { UserChannelMessage } from './UserChannelMessage';
import { UserGroupRole } from './UserGroupRole';
import { Post } from './Post';
import { IsNotEmpty, IsString, MaxLength, IsEmail, MinLength, IsUrl, IsIn, IsPositive, IsOptional } from 'class-validator';
import { BaseEntity } from './BaseEnity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @Index({ unique: true })
  @Column({
    type: 'varchar',
          length: 50,
    comment: '注册登陆用邮箱',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Column({
    type: 'varchar',
    comment: '加密过密码',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 30,
    comment: '个性昵称',
  })
  name: string;

  @IsString()
  @IsOptional()
  @Column({
    default: '这个人贼鸡儿懒，它什么都没写！',
    comment: '个人描述',
  })
  description: string;

  @IsUrl()
  @IsOptional()
  @Column({
    default: 'https://static.hdslb.com/images/member/noface.gif',
    comment: '头像',
  })
  avator: string;

  @IsIn(['male', 'female', 'unknown'])
  @IsOptional()
  @Column('enum', {
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
    comment: '性别',
  })
  sex: string;

  @IsPositive()
  @IsOptional()
  @Column({
    default: 0,
    comment: '登陆次数',
  })
  loginCount: number;

  @BeforeInsert()
  @BeforeUpdate()
  encodePassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  encodePassword1() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  /* 用户管理员关联 */
  @OneToOne(type => AdminUser, admin => admin.user)
  admin: AdminUser;

  /* 用户评论关联 */
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  /* 用户历史关联 */
  @OneToMany(type => UserHistory, history => history.user)
  histories: UserHistory[];

  /* 用户屏蔽关联 */
  @OneToMany(type => UserBlock, block => block.user)
  blocks: UserHistory[];

  /* 用户订阅关联 */
  @OneToMany(type => UserSubscribe, subscribe => subscribe.user)
  subscribes: UserSubscribe[];

  /* 用户消息关联 */
  @OneToMany(type => UserNotification, notification => notification.user)
  notifications: UserNotification[];

  /* 用户频道定位关联 */
  @OneToMany(type => UserChannelMessage, userAndChannel => userAndChannel.user)
  messageBelongs: UserChannelMessage[];

  /* 用户频道定位关联 */
  @OneToMany(type => UserGroupRole, groupRoles => groupRoles.user)
  groupRoles: UserGroupRole[];

  @ManyToMany(type => Post, post => post.likedUsers)
  likedPosts: Post[];

  @ManyToMany(type => Post, post => post.dislikedUsers)
  dislikedPosts: Post[];

  validatePassword(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.password);
  }
}