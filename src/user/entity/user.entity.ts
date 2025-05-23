import { TrxRentEntity } from "src/trx-rent/entity/trx-rent.entity";
import { RoleEnum } from "src/utils/enum/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column({ length: 255, nullable: true })
  password?: string;
  
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.MEMBER })
  role: RoleEnum;

  @OneToMany(() => TrxRentEntity, (rent) => rent.user)
  rents: TrxRentEntity[];

}
