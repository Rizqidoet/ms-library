import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CatalogueService } from "../service/catalogue.service";
import { CatalogueEntity } from "../entity/catalogue.entity";
import { CataloguePostDto } from "../dto/catalogue.dto";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PagedResponseDto, ResponseEntityDto } from "src/utils/dto/response-entity.dto";

@ApiTags('Catalogue')
@Controller('catalogue')
export class CatalogueController {
  
  constructor(
    private readonly catalogueService: CatalogueService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Find all catalogue data' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'rowsPerPage', required: false })
  @ApiResponse({ status: 200, description: 'Success', type: PagedResponseDto })
  async list(
    @Query('page') page = 1,
    @Query('rowsPerPage') rowsPerPage = 10,
  ) {
    return await this.catalogueService.findAll(+page, +rowsPerPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find catalogue data by id' })
  async getSingle(@Param('id') id: number) {
    return await this.catalogueService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new catalogue data' })
  @ApiResponse({ status: 201, description: 'Created', type: ResponseEntityDto })
  create(@Body() payload: CataloguePostDto) {
    return this.catalogueService.create(payload);
  }

  @Put()
  @ApiOperation({ summary: 'Update catalogue data by id' })
  @ApiResponse({ status: 200, description: 'Updated', type: ResponseEntityDto })
  Update(@Body() payload: CataloguePostDto) {
    if (!payload.id) throw new BadRequestException('ID Cannot Be Null');
    return this.catalogueService.update(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete catalogue data by id' })
  @ApiResponse({ status: 200, description: 'Deleted', type: ResponseEntityDto })
  Delete(@Param('id') id: number): Promise<ResponseEntityDto<null>> {
    console.log('controller id delete', id);
    
    return this.catalogueService.delete(id);
  }
}