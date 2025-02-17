import { BadRequestException, Injectable } from '@nestjs/common';
import { photoDto } from './dto/photo.dto';
import { PhotoRepository } from 'src/repository';

@Injectable()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async createflower(data: photoDto) {
    return this.photoRepository.createPhoto(data);
  }

  async getphoto(id: string): Promise<Buffer> {
    try {
      const photoBuffer = await this.photoRepository.getPhotoById(id);
      return photoBuffer;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
