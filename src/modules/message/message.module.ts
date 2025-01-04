import { RepositoryModule } from 'src/repository';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { EmailService } from '../email';
import { GoogleSheetsService } from 'src/googleSheet/googleSheet.servise';
import { GoogleSheetsModule } from 'src/googleSheet/google.module';

const providers = [
  MessageService,
  MessageGateway,
  EmailService,
  GoogleSheetsService,
];
const imports = [RepositoryModule, GoogleSheetsModule];

@Module({
  imports,
  controllers: [MessageController],
  providers,
  exports: providers,
})
export class MessageModule {}
