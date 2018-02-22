import { Entity, Column, ManyToMany, OneToMany, OneToOne, JoinColumn, Index } from 'typeorm';
import { Resource } from './Resource';
import { UserGroupRole } from './UserGroupRole';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { BaseEntity } from './BaseEnity';


@Entity()
export class Role extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 30,
    comment: '角色名称'
  })
  name: string;

  @ManyToMany(type => Resource, resource => resource.roles)
  resouces: Resource[]

  @OneToMany(type => UserGroupRole, userAndRole => userAndRole.role)
  userAndGroups:  UserGroupRole[]

  @OneToOne(type => Role, role => role.child)
  parent: Role

  @OneToOne(type => Role, role => role.parent)
  @JoinColumn()
  child: Role

  @OneToOne(type => Role, role => role.beGrant)
  @JoinColumn()
  grant: Role

  @OneToOne(type => Role, role => role.grant)
  beGrant: Role


}
