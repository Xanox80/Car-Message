import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { MessageModule } from './module/message/message.module.';
import { PrismaService } from 'prisma/prisma.service';
import { RepositoryModule } from './repository';

@Module({
  imports: [ConfigModule.forRoot(), RepositoryModule, MessageModule],
  controllers: [],
  providers: [ConfigService, PrismaService],
  exports: [ConfigService],
})
export class AppModule {}
