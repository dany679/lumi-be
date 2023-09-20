import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateProductDto): Promise<ProductEntity | null> {
    if (data.categoryId) {
      const exist = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!exist) {
        throw new Error('this category doest not exist');
      }
    }
    const product = await this.prisma.product.create({ data });

    return new ProductEntity(product);
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        kg: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const exist = await this.prisma.product.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this product doest not exist');
    }
    if (updateProductDto.categoryId) {
      const exist = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId },
      });
      if (!exist) {
        throw new Error('this category doest not exist');
      }
    }
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return product;
  }

  async remove(id: string) {
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
