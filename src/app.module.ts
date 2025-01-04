import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageModule } from './modules/message/message.module';
import { PrismaService } from 'prisma/prisma.service';
import { RepositoryModule } from './repository';
import { UserModule } from './modules/user';
import { EmailModule } from './modules/email';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RepositoryModule,
    MessageModule,
    UserModule,
    EmailModule,
  ],
  controllers: [],
  providers: [ConfigService, PrismaService, HttpExceptionFilter],
  exports: [ConfigService],
})
export class AppModule {}
