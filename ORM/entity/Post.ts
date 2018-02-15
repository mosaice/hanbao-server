import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {

  @PrimaryGeneratedColumn({
    comment: '文章id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '文章标题'
  })
  title: string;

  @Column({
    type: 'text',
    comment: '文章内容'
  })
  content: string;

  @Column({
    default: 0,
    comment: '浏览次数'
  })
  viewCount: number;

  @Column({
    enum: ['public', 'private', 'protect'],
    default: 'public',    
    comment: '浏览权限'
  })
  viewPermission: string;

  @Column({
    nullable: true,
    comment: '文章默认图'
  })
  banner: string;

}
