import { Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AdminUser {

  @PrimaryGeneratedColumn({
    comment: '管理员id'
  })
  id: number;

}
