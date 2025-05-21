import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CatalogueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;
  
  @Column()
  stok: number;
  
  @Column()
  author: string;
}