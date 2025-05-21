import { ApiProperty } from "@nestjs/swagger";

export class PaginDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  rowsPerPage: number;

  @ApiProperty()
  totalRows: number;

  @ApiProperty()
  totalPages: number;
}