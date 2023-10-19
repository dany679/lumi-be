import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService, // public authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const exist = this.findByEmail(user.email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      ...user,
      hashedPassword,
    };
    return this.prisma.user.create({ data });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
