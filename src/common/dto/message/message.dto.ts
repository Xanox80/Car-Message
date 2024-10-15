import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class MessageDto {
  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  text: string;

  @ApiProperty({ example: 73453 })
  @IsInt()
  @IsNotEmpty()
  @Expose()
  number: number;
}
