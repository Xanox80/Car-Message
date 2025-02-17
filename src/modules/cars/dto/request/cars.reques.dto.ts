import { ApiProperty } from '@nestjs/swagger';
import { CarsDto } from '../cars.dto';
import { File } from 'multer';

export class CarsRequestDto extends CarsDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: File;
}
