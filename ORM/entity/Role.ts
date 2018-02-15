import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
