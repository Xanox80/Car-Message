import { Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AccountingService } from './accaunting.service';
import { Body } from '@nestjs/common';
import { Accounting } from '@prisma/client';
import { AccauntingDto, AccauntingResponseDto } from './dto';

@Controller('Accaunting')
@ApiTags('Accaunting')
@ApiBearerAuth()
export class AccauntingController {
  constructor(private readonly accauntingService: AccountingService) {}

  @ApiOperation({ summary: 'Create Accaunting' })
  @ApiResponse({ type: AccauntingResponseDto })
  @Post()
  async createAccaunting(@Body() accauntingDto: AccauntingDto) {
    return this.accauntingService.createAccaunting(accauntingDto);
  }
}
