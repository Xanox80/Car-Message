import { Module } from '@nestjs/common';
import { AccauntingController } from './accaunting.controller';
import { RepositoryModule } from 'src/repository';
import { AccountingService } from './accaunting.service';

const providers = [AccountingService];
const imports = [RepositoryModule];

@Module({
  imports,
  controllers: [AccauntingController],
  providers,
  exports: providers,
})
export class AccauntingModule {}
