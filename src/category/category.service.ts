import { BadRequestException, Injectable } from '@nestjs/common';
import { ICategory } from './category.interface';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: ICategory): Promise<Category> {
    return await this.prisma.category.create({ data: category });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(name: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { name },
    });

    if (!category) {
      throw new BadRequestException(`Category with name "${name}" not found`);
    }

    return category;
  }
}
