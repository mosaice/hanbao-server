import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn({
    comment: '评论id'
  })
  id: number;

  @Column({
    type: 'text',
    comment: '评论内容'
  })
  content: string;

}
