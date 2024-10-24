import { RepositoryModule } from 'src/repository';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

const providers = [UserService];
const modules = [RepositoryModule];

@Module({
  imports: [...modules],
  controllers: [UserController],
  providers,
  exports: [...providers],
})
export class UserModule {}
