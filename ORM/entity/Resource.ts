import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role';
import { IsNotEmpty, IsString, MaxLength, IsIn } from 'class-validator';
import { BaseEntity } from './BaseEnity';

@Entity()
export class Resource extends BaseEntity {

  @IsIn(['view', 'access', 'update', 'delete', 'create'])
  @Column('enum', {
    enum: ['view', 'access', 'update', 'delete', 'create'],
    comment: '资源类型',
  })
  type: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Column({
    type: 'varchar',
    length: 30,
    comment: '资源所属模块',
  })
  module: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Column({
    type: 'varchar',
    length: 30,
    comment: '资源具体名称',
  })
  name: string;

  @ManyToMany(type => Role, role => role.resouces)
  @JoinTable()
  roles: Role[];
}
