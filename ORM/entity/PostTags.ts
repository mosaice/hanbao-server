import { Entity, Column, ManyToMany, Index } from 'typeorm';
import { Post } from './Post';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseEntity } from './BaseEnity';

@Entity()
export class PostTags extends BaseEntity {

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Index({ unique: true })
  @Column({
    type: 'varchar',
      length: 50,
    comment: '标签内容',
  })
  content: string;

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[];

}
