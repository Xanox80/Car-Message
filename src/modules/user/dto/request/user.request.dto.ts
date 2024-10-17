import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequestDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ example: 'Bogdan' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty({ example: 'Bogdan' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}
