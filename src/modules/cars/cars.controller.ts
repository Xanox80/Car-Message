import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CarService } from './cars.service';
import { CarResponseDto, CarsDto, CarsRequestDto } from './dto';
import { File } from 'multer';

@Controller('Cars')
@ApiTags('Cars')
export class CarController {
  constructor(private readonly carsService: CarService) {}

  @Post('/createCar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'createCar' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: CarResponseDto })
  @UseInterceptors(FileInterceptor('file'))
  async createPhoto(
    @UploadedFile() file: File,
    @Body() data: CarsRequestDto,
  ): Promise<CarResponseDto> {
    const createdPhoto = await this.carsService.createCar(file, data); // Change this line
    return;
  }
}
