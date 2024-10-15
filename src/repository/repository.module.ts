import { ConfigService } from '@nestjs/config';
import { MessageRepository } from './repositories';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

const providers = [PrismaService, ConfigService, MessageRepository];

@Module({
  imports: [],
  controllers: [],
  providers,
  exports: [...providers],
})
export class RepositoryModule {}
