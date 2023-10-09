import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDTO } from 'src/utils/dto';
import { CreateDemandsProductDto } from './dto/create-demands_product.dto';
import { UpdateDemandsProductDto } from './dto/update-demands_product.dto';

@Injectable()
export class DemandsProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDemandsProductDto) {
    const demandsProducts = await this.prisma.demandsProducts.create({
      data: {
        total_prod: data.total_prod ?? 0,
        total_plan: data.total_plan,
        demandId: data.demandId,
        productId: data.productId,
      },
    });
    return demandsProducts;
  }

  async findAll(pagination: PaginationDTO, id: number) {
    const demandsProducts = await this.prisma.demandsProducts.findMany({
      where: { demandId: id },
      include: {
        Product: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
      skip: pagination.skip,
      take: pagination.limit,
    });
    const count = await this.prisma.demandsProducts.count({
      where: { demandId: id },
    });
    pagination.count = count;
    return { demandsProducts, pagination };
  }

  async update(
    id: number,
    dataArray: UpdateDemandsProductDto[],
    idsToDelete?: number[] | [],
  ) {
    const exist = await this.prisma.demand.findUnique({
      where: { id },
    });
    if (!exist) {
      throw new Error('this demand products doest not exist');
    }
    const transaction = await this.prisma.$transaction(async () => {
      {
        const finish = await Promise.all(
          await dataArray.map(async (data, index) => {
            if (data.id) {
              await this.prisma.demandsProducts.update({
                where: { id: data.id },
                data: {
                  total_prod: Number(data.total_prod),
                  total_plan: Number(data.total_plan),
                  updated_at: new Date(),
                },
              });
            }
          }),
        );
        if (
          idsToDelete &&
          Array.isArray(idsToDelete) &&
          idsToDelete.length > 0 &&
          finish
        )
          await this.prisma.demandsProducts.deleteMany({
            where: {
              id: {
                in: idsToDelete,
              },
            },
          });
      }
    });

    return transaction;
  }
}
