import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { ReviewDto, ReviewResponseDto } from './dto';
import { Reviews } from '@prisma/client';

@Controller('Reviews')
@ApiTags('Reviews')
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Create reviews' })
  @Post('createReview')
  @ApiResponse({ type: ReviewResponseDto })
  async createReview(@Body() noteParams: ReviewDto) {
    return this.reviewsService.createReview(noteParams);
  }

  @ApiOperation({ summary: 'Delete review' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: ReviewResponseDto })
  @Delete('delete')
  async deleteReview(@Query('id') id: string): Promise<ReviewResponseDto> {
    const review = await this.reviewsService.deleteReview(id);
    return review;
  }
}
