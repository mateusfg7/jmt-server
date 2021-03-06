import { BadRequestException, Injectable } from '@nestjs/common';
import { INewCategory, IChangedCategory } from './category.interface';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: INewCategory): Promise<Category> {
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

  async update(category: IChangedCategory): Promise<Category> {
    return await this.prisma.category.update({
      where: { id: category.id },
      data: category,
    });
  }

  async deleteAll() {
    await this.prisma.category.deleteMany({});
  }

  async deleteOne(name: string) {
    await this.prisma.category.delete({
      where: { name },
    });
  }
}
