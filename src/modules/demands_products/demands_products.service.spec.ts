import { Test, TestingModule } from '@nestjs/testing';
import { DemandsProductsService } from './demands_products.service';

describe('DemandsProductsService', () => {
  let service: DemandsProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemandsProductsService],
    }).compile();

    service = module.get<DemandsProductsService>(DemandsProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
