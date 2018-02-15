import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserChannelMessage {
  @PrimaryGeneratedColumn({
    comment: '关系id'
  })
  id: number;

}
