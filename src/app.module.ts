import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageModule } from './modules/message/message.module';
import { PrismaService } from 'prisma/prisma.service';
import { RepositoryModule } from './repository';
import { UserModule } from './modules/user';
import { EmailModule } from './modules/email';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AccauntingModule } from './modules/accounting/accaunting.module';
import { GoogleSheetsModule } from './googleSheet/google.module';
import { PhotoModule } from './modules/photo/photo.module';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RepositoryModule,
    MessageModule,
    UserModule,
    EmailModule,
    ReviewsModule,
    AccauntingModule,
    GoogleSheetsModule,
    PhotoModule,
    CarsModule,
  ],
  controllers: [],
  providers: [ConfigService, PrismaService, HttpExceptionFilter],
  exports: [ConfigService],
})
export class AppModule {}
