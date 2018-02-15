import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PostTags {

  @PrimaryGeneratedColumn({
    comment: '文章标签id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '标签内容'
  })
  content: string;

}
