import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, Length } from "class-validator";
import { RoleEnum } from "src/utils/enum/role.enum";


export class UserPostDto {
  @ApiProperty()
  id?: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 150)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
