import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PhotoService } from './photo.service';
import { PhotoResponseDto } from './dto';

@Controller('photo')
@ApiTags('Photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('/createphoto')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'CreatePhoto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Photo file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ type: PhotoResponseDto })
  @UseInterceptors(FileInterceptor('file'))
  async createPhoto(@UploadedFile() file: any): Promise<PhotoResponseDto> {
    const createdPhoto = await this.photoService.createflower(file);
    return {
      photoBase64: createdPhoto.photo,
    };
  }

  @Get('/getPhoto/:id')
  @ApiOperation({ description: 'GetPhoto' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  async getPhoto(@Param('id') id: string) {
    this.photoService.getphoto(id);
  }
}
