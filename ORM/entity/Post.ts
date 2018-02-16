import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { UserGroup } from './UserGroup';
import { Comment } from './Comment';
import { PostAppend } from './PostAppend';
import { PostTags } from './PostTags';
import { User } from './User';

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

  @Column('enum', {
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
  tags: PostTags[]

  @ManyToMany(type => User, user => user.likedPosts)
  likedUsers: User[]

  @ManyToMany(type => User, user => user.dislikedPosts)
  dislikedUsers: User[]

}
