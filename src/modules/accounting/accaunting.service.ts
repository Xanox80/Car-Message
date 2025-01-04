import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AccauntingDto } from './dto';
import { Accounting } from '@prisma/client';
import { AccauntingRepository } from 'src/repository';

@Injectable()
export class AccountingService {
  constructor(private readonly accauntingRepository: AccauntingRepository) {}

  async createAccaunting(accauntingDto: AccauntingDto): Promise<Accounting> {
    return this.accauntingRepository.createAccaunting(accauntingDto);
  }

  async deleteAccaunting(id: string): Promise<Accounting> {
    return this.deleteAccaunting(id);
  }
}
