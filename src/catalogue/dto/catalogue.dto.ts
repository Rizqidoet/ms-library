import { ApiProperty } from "@nestjs/swagger";

export class CataloguePostDto {
  @ApiProperty()
  id?: number;
  
  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  stok: number;

  @ApiProperty()
  author: string;
}