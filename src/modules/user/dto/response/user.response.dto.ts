import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ example: 'AWFa' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'AWFa' })
  @IsString()
  @IsNotEmpty()
  password: string;

  public static mapFrom(data: User): UserResponseDto {
    return plainToClass(UserResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public static mapFromMulti(data: User[]): UserResponseDto[] {
    return data.map(UserResponseDto.mapFrom);
  }
}
