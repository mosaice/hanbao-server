import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Post } from './Post';

@Entity()
export class PostTags {

  @PrimaryGeneratedColumn({
    comment: '文章标签id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '标签内容'
  })
  content: string;

  @ManyToMany(type => Post, post => post.tags)
  @JoinTable()
  posts: Post[]

}
