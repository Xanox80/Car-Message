import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Cars } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CarResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @ApiProperty({ example: 'BMW' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  brand: string;

  @ApiProperty({ example: 'X5' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  model: string;

  @ApiProperty({ example: '2019' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  year: string;

  @ApiProperty({ example: 'black' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  color: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  price: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  engine: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  transmission: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  drive: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  body: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  @Optional()
  photoBase64?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  description: string;

  public static mapFrom(data: Cars): CarResponseDto {
    return plainToClass(CarResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public static mapFromMulti(data: Cars[]): CarResponseDto[] {
    return data.map(CarResponseDto.mapFrom);
  }
}
