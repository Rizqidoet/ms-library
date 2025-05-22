import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PagedResponseDto, ResponseEntityDto } from 'src/utils/dto/response-entity.dto';
import { UserPostDto } from '../dto/user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}


  @Get()
  @ApiOperation({ summary: 'Find all user data' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'rowsPerPage', required: false })
  @ApiResponse({ status: 200, description: 'Success', type: PagedResponseDto })
  async list(
    @Query('page') page = 1,
    @Query('rowsPerPage') rowsPerPage = 10,
  ) {
    return await this.userService.findAll(+page, +rowsPerPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user data by id' })
  async getSingle(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user data' })
  @ApiResponse({ status: 201, description: 'Created', type: ResponseEntityDto })
  create(@Body() payload: UserPostDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user data by id' })
  @ApiResponse({ status: 200, description: 'Updated', type: ResponseEntityDto })
  Update(@Param('id') id: number, @Body() payload: UserPostDto) {
    if (!payload.id) throw new BadRequestException('ID Cannot Be Null');
    return this.userService.update(+id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user data by id' })
  @ApiResponse({ status: 200, description: 'Deleted', type: ResponseEntityDto })
  Delete(@Param('id') id: number): Promise<ResponseEntityDto<null>> {
    return this.userService.delete(id);
  }

}
