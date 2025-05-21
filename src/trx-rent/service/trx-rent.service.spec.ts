import { Test, TestingModule } from '@nestjs/testing';
import { TrxRentService } from './trx-rent.service';

describe('TrxRentService', () => {
  let service: TrxRentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrxRentService],
    }).compile();

    service = module.get<TrxRentService>(TrxRentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
