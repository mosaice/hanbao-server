import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
    comment: '性别'
  })
  sex: string;

  @Column({
    comment: '登陆次数'
  })
  loginCount: number;

}