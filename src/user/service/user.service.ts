import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagedResponseDto, ResponseEntityDto } from 'src/utils/dto/response-entity.dto';
import { ResponseStatusEnum } from 'src/utils/enum/response-status.enum';
import { UserEntity } from '../entity/user.entity';
import { UserPostDto } from '../dto/user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async findAll(page = 1, rowsPerPage = 10) {
      const [result, totalRows] = await this.userRepo.findAndCount({
        skip: (page - 1) * rowsPerPage,
        take: rowsPerPage
      });
  
      const totalPages = Math.ceil(totalRows / rowsPerPage);
      const paging = {
        page,
        rowsPerPage,
        totalRows,
        totalPages
      };
  
      const response = new PagedResponseDto();
      response.status = ResponseStatusEnum.SUCCESS;
      response.data = result;
      response.paging = paging;
  
      return response;
    }
  
    async findOne(id: number): Promise<ResponseEntityDto<UserEntity | null>> {
      const catalogue = await this.userRepo.findOneBy({ id });
      const response = new ResponseEntityDto<UserEntity | null>();
      response.status = ResponseStatusEnum.SUCCESS,
      response.data = catalogue;
  
      return response;
    }
  
    async create(payload: UserPostDto): Promise<ResponseEntityDto<UserEntity>> {
      const newCatalogue = this.userRepo.create(payload);
      const savedCatalogue = await this.userRepo.save(newCatalogue);
      
      const response = new ResponseEntityDto<UserEntity>();
      response.status = ResponseStatusEnum.SUCCESS,
      response.data = savedCatalogue;
  
      return response;
    }
  
    async update(payload: UserPostDto): Promise<ResponseEntityDto<UserEntity>> {
      const id = payload.id;
      const catalogue = await this.userRepo.findOneBy({ id });
      if (!catalogue) throw new NotFoundException('Catalogue Not Found');
      
      await this.userRepo.update(catalogue.id, payload);
  
      const updatedCatalogue = await this.userRepo.findOneBy({ id });
      if (!updatedCatalogue) throw new NotFoundException('Catalogue Not Found');
      
      const response = new ResponseEntityDto<UserEntity>();
      response.status = ResponseStatusEnum.SUCCESS,
      response.data = updatedCatalogue;
  
      return response;
    }
  
    async delete(id: number): Promise<ResponseEntityDto<null>> {
      const catalogue = await this.userRepo.findOneBy({ id });
      if (!catalogue) throw new NotFoundException('Catalogue Not Found');
      
      await this.userRepo.delete(id);
  
      const response = new ResponseEntityDto<null>();
      response.status = ResponseStatusEnum.SUCCESS,
      response.data = null;
  
      return response;
    }
}
