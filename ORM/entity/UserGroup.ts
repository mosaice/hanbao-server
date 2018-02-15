import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserGroup {

  @PrimaryGeneratedColumn({
    comment: '用户组id'
  })
  id: number;

  @Column({
    enum: ['public', 'private'],
    default: 'public',    
    comment: '浏览权限'
  })
  viewPermission: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '用户组名称'
  })
  name: string;

  @Column({
    comment: '用户组描述'    
  })
  description: string;

}
