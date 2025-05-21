import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}