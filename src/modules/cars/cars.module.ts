import { RepositoryModule } from 'src/repository';
import { Module } from '@nestjs/common/decorators';
import { CarService } from './cars.service';
import { CarController } from './cars.controller';

const providers = [CarService];
const imports = [RepositoryModule];

@Module({
  imports,
  controllers: [CarController],
  providers,
  exports: providers,
})
export class CarsModule {}
