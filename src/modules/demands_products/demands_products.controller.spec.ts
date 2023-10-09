import { Test, TestingModule } from '@nestjs/testing';
import { DemandsProductsController } from './demands_products.controller';
import { DemandsProductsService } from './demands_products.service';

describe('DemandsProductsController', () => {
  let controller: DemandsProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandsProductsController],
      providers: [DemandsProductsService],
    }).compile();

    controller = module.get<DemandsProductsController>(DemandsProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
