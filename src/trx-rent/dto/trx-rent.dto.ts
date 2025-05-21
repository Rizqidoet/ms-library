import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsDateString, IsInt } from "class-validator";

export class TrxRentPostDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  catalogueId: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  rentDate: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  returnDate: string;

  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean;
  
}