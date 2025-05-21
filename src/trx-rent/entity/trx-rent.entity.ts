import { CatalogueEntity } from "src/catalogue/entity/catalogue.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('trx_rent')
export class TrxRentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  rentDate: Date;

  @Column({ type: 'date' })
  returnDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.rents, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity


  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.rents, { eager: true })
  @JoinColumn({ name: 'catalogue_id' })
  catalogue: CatalogueEntity
}