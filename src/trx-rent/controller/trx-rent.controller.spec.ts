import { Test, TestingModule } from '@nestjs/testing';
import { TrxRentController } from './trx-rent.controller';

describe('TrxRentController', () => {
  let controller: TrxRentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrxRentController],
    }).compile();

    controller = module.get<TrxRentController>(TrxRentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
