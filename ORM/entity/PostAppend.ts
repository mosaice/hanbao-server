import {Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from './Post';

@Entity()
export class PostAppend {

  @PrimaryGeneratedColumn({
    comment: '评论id'
  })
  id: number;

  @Column({
    type: 'text',
    comment: '追加内容'
  })
  content: string;

  /* 追加内容和文章关联关系 */
  @ManyToOne(type => Post, post => post.comments)
  post: Post

}
