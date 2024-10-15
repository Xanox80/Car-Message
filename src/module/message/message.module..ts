import { RepositoryModule } from 'src/repository';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';

const providers = [MessageService];
const modules = [RepositoryModule]; // Renaming 'module' to 'importsModule'

@Module({
  imports: [...modules],
  controllers: [MessageController],
  providers,
  exports: [...providers],
})
export class MessageModule {}
