import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDTO } from 'src/utils/dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateProductDto): Promise<ProductEntity | null> {
    const product = await this.prisma.product.create({ data });

    return new ProductEntity(product);
  }

  async findAll(pagination: PaginationDTO) {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
      },
      skip: pagination.skip,
      take: pagination.limit,
    });
    const count = await this.prisma.product.count();
    pagination.count = count;
    return { products, pagination };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error('this product doest not exist');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const exist = await this.prisma.product.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this product doest not exist');
    }
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return product;
  }

  async remove(id: number) {
    const exist = await this.prisma.product.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this product doest not exist');
    }
    await this.prisma.product.delete({
      where: { id },
    });
    return null;
  }
}
