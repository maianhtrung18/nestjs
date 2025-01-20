import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, products } from '@prisma/client';
import { productDTO } from './product.controller';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: productDTO) {
    await this.prismaService.products.create({
      data: createProductDto,
    });
    return 'This action adds a new product';
  }

  async findAll() {
    return this.prismaService.products.findMany();
  }

  findOne(id: number) {
    return this.prismaService.products.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateProductDto: products) {
    await this.prismaService.products.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    await this.prismaService.products.delete({
      where: {
        id,
      },
    });
    return `This action removes a #${id} product`;
  }
}
