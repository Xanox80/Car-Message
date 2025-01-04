import { RepositoryModule } from 'src/repository';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Module } from '@nestjs/common/decorators';

const providers = [ReviewsService];
const imports = [RepositoryModule];

@Module({
  imports,
  controllers: [ReviewsController],
  providers,
  exports: providers,
})
export class ReviewsModule {}
