import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IPagination, PaginationDTO, idDTO } from 'src/utils/dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity | null> {
    return new ProductEntity(
      await this.productService.create(createProductDto),
    );
  }

  @Get()
  findAll(@Query() queryPagination: IPagination) {
    const pagination = new PaginationDTO(queryPagination);

    return this.productService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param() { id }: idDTO) {
    return this.productService.findOne(id);
  }

  @HttpCode(201)
  @Put(':id')
  update(@Param() { id }: idDTO, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param() { id }: idDTO) {
    return this.productService.remove(id);
  }
}
