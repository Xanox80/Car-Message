import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageModule } from './modules/message/message.module';
import { PrismaService } from 'prisma/prisma.service';
import { RepositoryModule } from './repository';
import { UserModule } from './modules/user';
import { EmailModule } from './modules/email';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RepositoryModule,
    MessageModule,
    UserModule,
    EmailModule,
  ],
  controllers: [],
  providers: [ConfigService, PrismaService],
  exports: [ConfigService],
})
export class AppModule {}
