import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogueEntity } from '../entity/catalogue.entity';
import { Repository } from 'typeorm';
import { CataloguePostDto } from '../dto/catalogue.dto';
import { PagedResponseDto, ResponseEntityDto } from 'src/utils/dto/response-entity.dto';
import { ResponseStatusEnum } from 'src/utils/enum/response-status.enum';

@Injectable()
export class CatalogueService {

  constructor(
    @InjectRepository(CatalogueEntity)
    private catalogueRepo: Repository<CatalogueEntity>
  ) {}

  async findAll(page = 1, rowsPerPage = 10) {
    const [result, totalRows] = await this.catalogueRepo.findAndCount({
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

  async findOne(id: number): Promise<ResponseEntityDto<CatalogueEntity | null>> {
    const catalogue = await this.catalogueRepo.findOneBy({ id });
    const response = new ResponseEntityDto<CatalogueEntity | null>();
    response.status = ResponseStatusEnum.SUCCESS,
    response.data = catalogue;

    return response;
  }

  async create(payload: CataloguePostDto): Promise<ResponseEntityDto<CatalogueEntity>> {
    const newCatalogue = this.catalogueRepo.create(payload);
    const savedCatalogue = await this.catalogueRepo.save(newCatalogue);
    
    const response = new ResponseEntityDto<CatalogueEntity>();
    response.status = ResponseStatusEnum.SUCCESS,
    response.data = savedCatalogue;

    return response;
  }

  async update(payload: CataloguePostDto): Promise<ResponseEntityDto<CatalogueEntity>> {
    const { id } = payload;
    const catalogue = await this.catalogueRepo.findOneBy({ id });
    if (!catalogue) throw new NotFoundException('Catalogue Not Found');
    
    await this.catalogueRepo.update(catalogue.id, payload);

    const updatedCatalogue = await this.catalogueRepo.findOneBy({ id });
    if (!updatedCatalogue) throw new NotFoundException('Catalogue Not Found');
    
    const response = new ResponseEntityDto<CatalogueEntity>();
    response.status = ResponseStatusEnum.SUCCESS,
    response.data = updatedCatalogue;

    return response;
  }

  async delete(id: number): Promise<ResponseEntityDto<null>> {
    const catalogue = await this.catalogueRepo.findOneBy({ id });
    if (!catalogue) throw new NotFoundException('Catalogue Not Found');
    
    await this.catalogueRepo.delete(id);

    const response = new ResponseEntityDto<null>();
    response.status = ResponseStatusEnum.SUCCESS,
    response.data = null;

    return response;
  }
}
