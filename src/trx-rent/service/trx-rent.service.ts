import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogueEntity } from 'src/catalogue/entity/catalogue.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { TrxRentEntity } from '../entity/trx-rent.entity';
import { TrxRentPostDto } from '../dto/trx-rent.dto';
import { ResponseEntityDto } from 'src/utils/dto/response-entity.dto';
import { ResponseStatusEnum } from 'src/utils/enum/response-status.enum';

@Injectable()
export class TrxRentService {

  constructor(
    @InjectRepository(TrxRentEntity)
    private readonly trxRentRepo: Repository<TrxRentEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(CatalogueEntity)
    private readonly catalogueRepo: Repository<CatalogueEntity>,
  ) {}
  

  async rentBook(payload: TrxRentPostDto): Promise<ResponseEntityDto<TrxRentEntity>> {
    const { userId, catalogueId, rentDate, returnDate } = payload;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User Not Found');

    const catalogue = await this.catalogueRepo.findOneBy({ id: catalogueId });
    if (!catalogue) throw new NotFoundException('Catalogue Not Found');

    if (catalogue.stok <= 0) {
      throw new BadRequestException('Stok buku habis, tidak bisa dipinjam');
    }

    const alreadyRented = await this.trxRentRepo
      .createQueryBuilder('trx')
      .leftJoinAndSelect('trx.catalogue', 'catalogue')
      .where('trx.user_id = :userId', { userId })
      .andWhere('catalogue.title = :title', { title: catalogue.title })
      .andWhere('trx.isActive = true')
      .getOne();

    if (alreadyRented) {
      throw new BadRequestException('You cannot rent more than one copy of the same book title');
    }

    const newRent = {
      user,
      catalogue,
      rentDate: rentDate,
      returnDate: returnDate,
      isActive: true,
    }
    const rent = this.trxRentRepo.create(newRent);

    catalogue.stok -= 1;
    await this.catalogueRepo.save(catalogue);

    const rentBook = await this.trxRentRepo.save(rent);

    const response = new ResponseEntityDto<TrxRentEntity>();
    response.status = ResponseStatusEnum.SUCCESS,
    response.data = rentBook;

    return response;
  }

  async returnBook(id: number): Promise<ResponseEntityDto<TrxRentEntity>> {
    const rent = await this.trxRentRepo.findOneBy({ id });

    if (!rent) {
      throw new NotFoundException('Transaction Rent Not Found');
    }

    if (!rent.isActive) {
      throw new BadRequestException('Book Already Returned');
    }

    rent.isActive = false;
    rent.catalogue.stok += 1;
    await this.catalogueRepo.save(rent.catalogue);
    const returnBook = await this.trxRentRepo.save(rent);

    const response = new ResponseEntityDto<TrxRentEntity>();
    response.status = ResponseStatusEnum.SUCCESS,
    response.data = returnBook;

    return response;
  }
}
