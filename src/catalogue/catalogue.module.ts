import { Module } from '@nestjs/common';
import { CatalogueService } from './service/catalogue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueEntity } from './entity/catalogue.entity';
import { CatalogueController } from './controller/catalogue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogueEntity])],
  controllers: [CatalogueController],
  providers: [CatalogueService],
  exports: [CatalogueService, TypeOrmModule]
})
export class CatalogueModule {}
