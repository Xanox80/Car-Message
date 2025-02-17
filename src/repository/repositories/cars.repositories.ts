import { Injectable } from '@nestjs/common';
import { Cars } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CarsDto, CarsRequestDto } from 'src/modules/cars';

@Injectable()
export class CarsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createCar(file: any, carsDto: CarsRequestDto): Promise<Cars> {
    try {
      const base64String = await convertToBase64(file);
      const { photoBase64, ...rest } = carsDto;
      const createdCar = await this.prisma.cars.create({
        data: {
          ...rest,
          photo: base64String,
        },
      });
      return createdCar;
    } catch (error) {
      throw new Error(`Помилка при збереженні фотографії: ${error.message}`);
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
