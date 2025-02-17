import { ConfigService } from '@nestjs/config';
import {
  AccauntingRepository,
  CarsRepository,
  MessageRepository,
  ReviewsRepository,
  UserRepository,
} from './repositories';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GoogleSheetsService } from 'src/googleSheet/googleSheet.servise';
import { PhotoRepository } from './repositories/photo.repository';

const providers = [
  PrismaService,
  ConfigService,
  GoogleSheetsService,
  MessageRepository,
  UserRepository,
  ReviewsRepository,
  AccauntingRepository,
  PhotoRepository,
  CarsRepository,
];

@Module({
  imports: [],
  controllers: [],
  providers,
  exports: [...providers],
})
export class RepositoryModule {}
