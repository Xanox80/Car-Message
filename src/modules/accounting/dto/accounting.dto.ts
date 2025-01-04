import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AccauntingDto {
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
}
