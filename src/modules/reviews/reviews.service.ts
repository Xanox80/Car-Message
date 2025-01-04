import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from 'src/repository/repositories/reviews.repository';
import { ReviewDto } from './dto';
import { Reviews } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async createReview(reviewDto: ReviewDto): Promise<Reviews> {
    return this.reviewsRepository.createReview(reviewDto);
  }

  async deleteReview(id: string): Promise<Reviews> {
    return this.reviewsRepository.deleteReview(id);
  }
}
