import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role';

@Entity()
export class Resource {

  @PrimaryGeneratedColumn({
    comment: '资源id'
  })
  id: number;

  @Column('enum', {
    enum: ['view', 'access', 'update', 'delete'],
    comment: '资源类型'
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '资源所属模块'
  })
  module: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '资源具体名称'
  })
  name: string;

  @ManyToMany(type => Role, role => role.resouces)
  @JoinTable()
  roles: Role[]
}
