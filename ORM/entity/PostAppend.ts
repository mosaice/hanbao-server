import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PostAppend {

  @PrimaryGeneratedColumn({
    comment: '评论id'
  })
  id: number;

  @Column({
    type: 'text',
    comment: '追加内容'
  })
  content: string;
}
