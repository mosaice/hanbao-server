import { Entity, Column, ManyToOne, OneToMany, ManyToMany, Index, JoinTable } from 'typeorm';
import { UserGroup } from './UserGroup';
import { Comment } from './Comment';
import { PostAppend } from './PostAppend';
import { PostTags } from './PostTags';
import { User } from './User';
import { IsString, IsNotEmpty, MaxLength, IsPositive, IsIn, IsOptional, IsUrl } from 'class-validator'
import { BaseEntity } from './BaseEnity';

@Entity()
export class Post extends BaseEntity {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    comment: '文章标题'
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'text',
    comment: '文章内容'
  })
  content: string;

  @IsPositive()
  @IsOptional()
  @Column({
    default: 0,
    comment: '浏览次数'
  })
  viewCount: number;


  @IsIn(['public', 'private', 'protect'])
  @IsOptional()
  @Column('enum', {
    enum: ['public', 'private', 'protect'],
    default: 'public',
    comment: '浏览权限'
  })
  viewPermission: string;

  @IsUrl()
  @IsOptional()
  @Column({
    nullable: true,
    comment: '文章默认图'
  })
  banner: string;

  /* 文章归属 */
  @ManyToOne(type => UserGroup, group => group.posts)
  owner: UserGroup


  /* 文章评论关联 */
  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[]

  /* 文章追加关联 */
  @OneToMany(type => PostAppend, append => append.post)
  appends: PostAppend[]

  @ManyToMany(type => PostTags, tag => tag.posts)
  @JoinTable()
  tags: PostTags[]

  @ManyToMany(type => User, user => user.likedPosts)
  @JoinTable()  
  likedUsers: User[]

  @ManyToMany(type => User, user => user.dislikedPosts)
  @JoinTable()  
  dislikedUsers: User[]

}
