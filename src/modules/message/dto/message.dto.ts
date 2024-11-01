import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  fileUrl?: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
