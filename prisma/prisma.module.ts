import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
const providers = [PrismaService];

@Module({
  providers,
  exports: providers,
})
export class PrismaModule {}
