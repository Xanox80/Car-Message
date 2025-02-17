import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class PhotoResponseDto {
	@ApiProperty()
	@Expose()
	@IsString()
	photoBase64: string;
}
