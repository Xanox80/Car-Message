import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class ReviewDto {
  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  reviews: string;

  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  advantages: string;

  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  disadvantages: string;

  @ApiProperty({ example: 73453 })
  @IsInt()
  @IsNotEmpty()
  @Expose()
  stars: number;
}
