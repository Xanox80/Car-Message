import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Photos } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PhotoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPhoto(file: any): Promise<Photos> {
    try {
      const base64String = await convertToBase64(file);
      const createdPhoto = await this.prisma.photos.create({
        data: {
          photo: base64String,
        },
      });
      return createdPhoto;
    } catch (error) {
      throw new Error(`Помилка при збереженні фотографії: ${error.message}`);
    }
  }

  async getPhotoById(photoId: string): Promise<Buffer> {
    try {
      const photoRecord = await this.prisma.photos.findUnique({
        where: { id: photoId },
      });
      if (!photoRecord) {
        throw new Error(`Фотографія з ID ${photoId} не знайдена`);
      }
      const base64String = photoRecord.photo;
      const buffer = Buffer.from(base64String, 'base64');
      return buffer;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

async function convertToBase64(file): Promise<string> {
  if (!file || !file.mimetype.startsWith('image')) {
    return Promise.reject(
      new Error('Будь ласка, виберіть файл у форматі зображення.'),
    );
  }

  if (file) {
    const base64String = file.buffer.toString('base64');
    return Promise.resolve(base64String);
  } else {
    throw new Error('Будь ласка, виберіть файл для завантаження.');
  }
}
