import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { FeesHttpStatus } from 'src/utils/erros/fees.enum.error';
import { IPaginationFees } from '../../utils/feesPaginationDTO';
import { CreateFees } from './dto/create_fees.dto';
import { UpdateAccessPoints } from './dto/update_fees.dto';
import { FeesEntity } from './entities/fees.entity';

@Injectable()
export class FeesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateFees): Promise<FeesEntity | null> {
    const point = await this.prisma.fees.create({ data });

    return point as FeesEntity;
  }

  async findAll(pagination: IPaginationFees) {
    const initialDate = pagination.date
      ? new Date(pagination.date)
      : new Date(1500, 6, 1);
    const initialEndDate = pagination.date
      ? new Date(pagination.date)
      : new Date(2500, 6, 1);
    // console.log(newStartDate);
    let lastDay = new Date(
      initialEndDate.getFullYear(),
      initialEndDate.getMonth() + 1,
      0,
    );
    let firstDay = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      1,
    );

    const startDate = firstDay.toISOString();
    // const startDate = new Date(1500, 6, 1).toISOString();
    const endDate = lastDay.toISOString();
    const fees = await this.prisma.fees.findMany({
      where: {
        AND: [
          { userId: pagination.userId },
          {
            nClient: {
              contains: pagination.nClient,
            },
          },
          {
            referenceDate: {
              lte: endDate,
              gte: startDate,
            },
          },
        ],
      },
      orderBy: {
        created_at: 'asc',
      },
      skip: pagination.skip,
      take: pagination.limit,
    });
    const count = await this.prisma.fees.count({
      where: {
        AND: [
          { userId: pagination.userId },
          {
            nClient: {
              contains: pagination.nClient,
            },
          },
        ],
      },
    });
    pagination.count = count;
    pagination.next = count - pagination.skip > pagination.limit;

    return { fees, pagination };
  }

  async findOne(userId: string, id: string) {
    const product = await this.prisma.fees.findUnique({
      where: { id },
    });
    if (!product) {
      throw new HttpException(FeesHttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (product.userId !== userId) {
      throw new HttpException(
        FeesHttpStatus.NOT_ALLOW,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    return product;
  }
  async dashboardFees(userId: string) {
    const [nClient, valuesData, listData] = await Promise.all([
      //nClient
      await this.prisma
        .$queryRaw(Prisma.sql`SELECT COUNT(DISTINCT "public"."fees"."nClient")  FROM "public"."fees" WHERE ("public"."fees"."userId"
    = ${userId})`),
      await this.prisma.fees.groupBy({
        where: {
          userId: userId,
        },
        by: ['userId'],
        _sum: {
          total: true,
          energiaCompensadaPrice: true,
          energiaEletricaPrice: true,
          energiaInjetadaPrice: true,
          energiaCompensadaWh: true,
          energiaEletricaWh: true,
          energiaInjetadaWh: true,
        },
      }),
      //data
      await this.prisma.fees.findMany({
        where: {
          userId: userId,
        },

        select: {
          total: true,
          energiaCompensadaPrice: true,
          energiaEletricaPrice: true,
          energiaInjetadaPrice: true,
          energiaCompensadaWh: true,
          energiaEletricaWh: true,
          energiaInjetadaWh: true,
          referenceDate: true,
          nClient: true,
        },
        orderBy: {
          nClient: 'asc',
        },
        take: 12,
      }),

      await this.prisma.fees.findMany({
        where: {
          userId: userId,
        },

        select: {
          total: true,
          energiaCompensadaPrice: true,
          energiaEletricaPrice: true,
          energiaInjetadaPrice: true,
          energiaCompensadaWh: true,
          energiaEletricaWh: true,
          energiaInjetadaWh: true,
          referenceDate: true,
        },
        take: 12,
        orderBy: {
          referenceDate: 'asc',
        },
      }),
    ]);

    const places = nClient ? nClient[0].count : 0;

    return { valuesData, places: Number(places), listData };
  }

  async update(
    userId: string,
    id: string,
    updateProductDto: UpdateAccessPoints,
  ) {
    const exist = await this.prisma.fees.findUnique({ where: { id } });
    if (!exist) {
      throw new HttpException(FeesHttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (exist.userId !== userId) {
      throw new HttpException(
        FeesHttpStatus.NOT_ALLOW,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    const point = await this.prisma.fees.update({
      where: { id },
      data: updateProductDto,
    });
    return point;
  }

  async remove(userId: string, id: string) {
    const exist = await this.prisma.fees.findUnique({ where: { id } });
    if (!exist) {
      throw new HttpException(FeesHttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (exist.userId !== userId) {
      throw new HttpException(
        FeesHttpStatus.NOT_ALLOW,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    await this.prisma.fees.delete({
      where: { id },
    });
    return null;
  }
}
