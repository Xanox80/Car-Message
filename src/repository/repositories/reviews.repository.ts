import { Injectable } from '@nestjs/common';
import { Reviews } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewDto } from 'src/modules/reviews';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(reviewDto: ReviewDto): Promise<Reviews> {
    return this.prisma.reviews.create({
      data: {
        ...reviewDto,
      },
    });
  }

  async deleteReview(id: string): Promise<Reviews> {
    return this.prisma.reviews.delete({
      where: {
        id,
      },
    });
  }
}
