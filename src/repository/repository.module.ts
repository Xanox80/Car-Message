import { ConfigService } from '@nestjs/config';
import {
  AccauntingRepository,
  MessageRepository,
  ReviewsRepository,
  UserRepository,
} from './repositories';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GoogleSheetsService } from 'src/googleSheet/googleSheet.servise';

const providers = [
  PrismaService,
  ConfigService,
  GoogleSheetsService,
  MessageRepository,
  UserRepository,
  ReviewsRepository,
  AccauntingRepository,
];

@Module({
  imports: [],
  controllers: [],
  providers,
  exports: [...providers],
})
export class RepositoryModule {}
