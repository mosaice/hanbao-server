import { Entity, Column, OneToMany, Index } from 'typeorm';
import { Post } from './Post';
import { UserGroupRole } from './UserGroupRole';
import { IsIn, IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntity } from './BaseEnity';

@Entity()
export class UserGroup extends BaseEntity {

  @IsIn(['public', 'private'])
  @IsOptional()
  @Column('enum', {
    enum: ['public', 'private'],
    default: 'public',
    comment: '浏览权限',
  })
  viewPermission: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 30,
    comment: '用户组名称',
  })
  name: string;

  @IsString()
  @Column({
    comment: '用户组描述',
  })
  description: string;

  /* 文章归属 */
  @OneToMany(type => Post, post => post.owner)
  posts: Post[];

  /* 文章归属 */
  @OneToMany(type => UserGroupRole, userRole => userRole.group)
  userRoles: UserGroupRole[];

}
