import { TrxRentEntity } from "src/trx-rent/entity/trx-rent.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('catalogue')
export class CatalogueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 100 })
  category: string;
  
  @Column()
  stok: number;
  
  @Column({ length: 150 })
  author: string;

  @OneToMany(() => TrxRentEntity, (rent) => rent.user)
  rents: TrxRentEntity[];
}