import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { TrxRentService } from '../service/trx-rent.service';
import { TrxRentPostDto } from '../dto/trx-rent.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CataloguePostDto } from 'src/catalogue/dto/catalogue.dto';
import { ResponseEntityDto } from 'src/utils/dto/response-entity.dto';

@ApiTags('Transaction Rent')
@Controller('trx-rent')
export class TrxRentController {
  constructor(private readonly trxRentService: TrxRentService) {}

  @Post()
  @ApiOperation({ summary: 'Create new transaction of rent book' })
  @ApiResponse({ status: 201, description: 'Created', type: ResponseEntityDto })
  createRent(@Body() payload: TrxRentPostDto) {
    return this.trxRentService.rentBook(payload);
  }

  @Patch('return/:id')
  @ApiOperation({ summary: 'Returning book by id transaction' })
  @ApiResponse({ status: 200, description: 'Updated', type: ResponseEntityDto })
  Update(@Param('id') id: number) {
    if (!id) throw new BadRequestException('ID Cannot Be Null');
    return this.trxRentService.returnBook(id);
  }
  
}
