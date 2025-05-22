import { forwardRef, Module } from '@nestjs/common';
import { TrxRentController } from './controller/trx-rent.controller';
import { TrxRentService } from './service/trx-rent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrxRentEntity } from './entity/trx-rent.entity';
import { UserModule } from 'src/user/user.module';
import { CatalogueModule } from 'src/catalogue/catalogue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrxRentEntity]),
    forwardRef(() => UserModule),
    CatalogueModule
  ],
  controllers: [TrxRentController],
  providers: [TrxRentService],
  exports: [TrxRentService, TypeOrmModule]
})
export class TrxRentModule {}
