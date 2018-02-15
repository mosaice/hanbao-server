import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn({
    comment: '评论id'
  })
  id: number;

  @Column({
    type: 'text',
    comment: '评论内容'
  })
  content: string;

  /* 用户评论关联 */
  @ManyToOne(type => User, user => user.comments)
  user: User
  /* 文章评论关联 */
  @ManyToOne(type => Post, post => post.comments)
  post: Post
  /* 评论引用关系 */
  @OneToMany(type => Comment, comment => comment.quote)
  replys: Comment[]
  @ManyToOne(type => Comment, comment => comment.replys)
  quote: Comment

}
