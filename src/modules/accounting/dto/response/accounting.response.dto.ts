import { ApiProperty } from '@nestjs/swagger';
import { Accounting } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AccauntingResponseDto {
  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  cost: string;

  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  mileage: string;

  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  accident: string;

  public static mapFrom(data: Accounting): AccauntingResponseDto {
    return plainToClass(AccauntingResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public static mapFromMulti(data: Accounting[]): AccauntingResponseDto[] {
    return data.map(AccauntingResponseDto.mapFrom);
  }
}
