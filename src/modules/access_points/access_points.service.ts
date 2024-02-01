import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AccessPointsHttpStatus } from 'src/utils/erros/access_points.error';
import { SensorPaginationDTO } from 'src/utils/sensorPaginationDTO';
import { CreateAccessPoints } from './dto/create-access_points.dto';
import { UpdateAccessPoints } from './dto/update-access_points.dto';
import { AccessPointsEntity } from './entities/access_points.entity';

@Injectable()
export class AccessPointsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateAccessPoints): Promise<AccessPointsEntity | null> {
    const point = await this.prisma.accessPoint.create({ data });

    return point as AccessPointsEntity;
  }

  async findAll(pagination: SensorPaginationDTO) {
    const points = await this.prisma.accessPoint.findMany({
      where: {
        AND: [
          {
            name: {
              contains: `${pagination.name}`,
            },
            sensor: {
              contains: `${pagination.sensor || ''}`,
            },
            sensorID: {
              contains: `${pagination.sensorID || ''}`,
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        sensor: true,
        sensorID: true,
        machineId: true,
        Machine: {
          select: {
            name: true,
            type: true,
          },
        },
      },
      skip: pagination.skip,
      take: pagination.limit,
    });
    const count = await this.prisma.accessPoint.count({
      where: {
        AND: [
          {
            name: {
              contains: `${pagination.name}`,
            },
            sensor: {
              contains: `${pagination.sensor || ''}`,
            },
            sensorID: {
              contains: `${pagination.sensorID || ''}`,
            },
          },
        ],
      },
    });
    pagination.count = count;
    // pagination.prev = pagination.page>1&& count>0 ;
    pagination.next = count - pagination.skip > pagination.limit;

    return { points, pagination };
  }

  async findOne(id: string) {
    const product = await this.prisma.accessPoint.findUnique({
      where: { id },
      include: {
        Machine: {
          select: {
            name: true,
            type: true,
            id: true,
          },
        },
      },
    });
    if (!product) {
      throw new HttpException(
        AccessPointsHttpStatus.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateAccessPoints) {
    const exist = await this.prisma.accessPoint.findUnique({ where: { id } });
    if (!exist) {
      throw new HttpException(
        AccessPointsHttpStatus.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const point = await this.prisma.accessPoint.update({
      where: { id },
      data: updateProductDto,
    });
    return point;
  }

  async remove(id: string) {
    const exist = await this.prisma.accessPoint.findUnique({ where: { id } });
    if (!exist) {
      throw new HttpException(
        AccessPointsHttpStatus.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prisma.accessPoint.delete({
      where: { id },
    });
    return null;
  }
}
