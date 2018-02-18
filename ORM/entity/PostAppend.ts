import {Entity, Column, ManyToOne } from "typeorm";
import { Post } from './Post';
import { IsNotEmpty, IsString } from 'class-validator'
import { BaseEntity } from './BaseEnity';

@Entity()
export class PostAppend extends BaseEntity {

  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'text',
    comment: '追加内容'
  })
  content: string;

  /* 追加内容和文章关联关系 */
  @ManyToOne(type => Post, post => post.comments)
  post: Post

}
