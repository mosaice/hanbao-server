import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserGroupRole {

  @PrimaryGeneratedColumn({
    comment: '用户和组关系表id'
  })
  id: number;


}