import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Resource } from './Resource';
import { UserGroupRole } from './UserGroupRole';


@Entity()
export class Role {
  @PrimaryGeneratedColumn({
    comment: '角色id'
  })
  id: number;

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
  grant: Role

  @OneToOne(type => Role, role => role.grant)
  beGrant: Role


}
