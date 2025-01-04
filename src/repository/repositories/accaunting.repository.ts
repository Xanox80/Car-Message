import { Injectable } from '@nestjs/common';
import { Accounting } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AccauntingDto } from 'src/modules/accounting';

@Injectable()
export class AccauntingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAccaunting(accauntingDto: AccauntingDto): Promise<Accounting> {
    return this.prisma.accounting.create({
      data: {
        ...accauntingDto,
      },
    });
  }

  async deleteAccaunting(id: string): Promise<Accounting> {
    return this.prisma.accounting.delete({
      where: {
        id,
      },
    });
  }
}
