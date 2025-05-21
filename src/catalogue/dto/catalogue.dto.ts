import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CataloguePostDto {
  @ApiProperty()
  id?: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 150)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 100)
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 4)
  stok: number;

  @ApiProperty()
  @Length(2, 150)
  author: string;
}