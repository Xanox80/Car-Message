import { ConfigService } from '@nestjs/config';
import { MessageRepository, UserRepository } from './repositories';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

const providers = [
  PrismaService,
  ConfigService,
  MessageRepository,
  UserRepository,
];

@Module({
  imports: [],
  controllers: [],
  providers,
  exports: [...providers],
})
export class RepositoryModule {}
