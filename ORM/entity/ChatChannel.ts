import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ChatChannel {
  @PrimaryGeneratedColumn({
    comment: '频道id'
  })
  id: number;


  @Column({
    type: 'varchar',
    length: 30,
    comment: '频道名称'
  })
  name: string;

  @Column({
    enum: [true, false],
    default: true,
    comment: '是否是固定频道'
  })
  fixable: boolean;
}
