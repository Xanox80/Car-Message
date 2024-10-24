import { RepositoryModule } from 'src/repository';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { EmailService } from '../email';

const providers = [MessageService, MessageGateway, EmailService];
const imports = [RepositoryModule];

@Module({
  imports,
  controllers: [MessageController],
  providers,
  exports: providers,
})
export class MessageModule {}
