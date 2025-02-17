import { BadRequestException, Injectable } from '@nestjs/common';
import { CarsRepository } from 'src/repository';
import { CarsDto, CarsRequestDto } from './dto';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarsRepository) {}

  async createCar(file: any, data: CarsRequestDto) {
    return this.carRepository.createCar(file, data);
  }
}
