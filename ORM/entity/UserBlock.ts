import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserBlock {

  @PrimaryGeneratedColumn({
    comment: '屏蔽项id'
  })
  id: number;

  @Column({
    enum: ['user', 'group', 'ohter'],
    default: 'ohter',
    comment: '屏蔽类型'
  })
  type: string;

  @Column({
    comment: '屏蔽的id'
  })
  blockId: number;

}
