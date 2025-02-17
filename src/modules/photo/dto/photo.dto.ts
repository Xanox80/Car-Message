import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class photoDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@Expose()
	photoBase64: string;
}
