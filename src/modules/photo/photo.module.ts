import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';

const providers = [PhotoService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [PhotoController],
	providers,
	exports: [...providers],
})
export class PhotoModule {}
