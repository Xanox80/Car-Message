import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageDto, MessageResponseDto } from 'src/common';

@Controller('message')
@ApiTags('Message')
@ApiBearerAuth()
@Controller('Message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @ApiOperation({ description: 'Create a new message' })
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({ type: MessageResponseDto })
  // @Post('/createMessage')
  // async createMessage(@Body() messageDto: MessageDto): Promise<any> {
  //   console.log('Received messageDto:', messageDto);
  //   return await this.messageService.createMessage(messageDto);
  // }

  @ApiOperation({ description: 'Create a new message' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: MessageResponseDto })
  @Get('/getMessage')
  async getMessage(): Promise<any> {
    return await this.messageService.getMessage();
  }
}
