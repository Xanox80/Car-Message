import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from 'src/enum/roles.enum';

export class UserUpdataRequestDto {
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

  @ApiProperty({ example: 'member' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  role?: RolesEnum;
}
