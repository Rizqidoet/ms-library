import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Length, Max, Min } from "class-validator";

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
  @IsInt()
  @Min(0)
  @Max(100)
  stok: number;

  @ApiProperty()
  @Length(2, 150)
  author: string;
}