import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class MessageResponseDto {
  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  text: string;

  @ApiProperty({ example: 73453 })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  number: number;

  public static mapFrom(data: Message): MessageResponseDto {
    return plainToClass(MessageResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public static mapFromMulti(data: Message[]): MessageResponseDto[] {
    return data.map(MessageResponseDto.mapFrom);
  }
}
