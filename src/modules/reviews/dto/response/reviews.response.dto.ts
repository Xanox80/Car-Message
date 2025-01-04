import { ApiProperty } from '@nestjs/swagger';
import { Reviews } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class ReviewResponseDto {
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

  public static mapFrom(data: Reviews): ReviewResponseDto {
    return plainToClass(ReviewResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public static mapFromMulti(data: Reviews[]): ReviewResponseDto[] {
    return data.map(ReviewResponseDto.mapFrom);
  }
}
