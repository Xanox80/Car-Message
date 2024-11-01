import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageDto, MessageResponseDto } from './dto';
import { EmailService } from '../email/email.service';

@Controller('message')
@ApiTags('Message')
@ApiBearerAuth()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly emailService: EmailService,
  ) {}

  @ApiOperation({ description: 'Create a new message' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: MessageResponseDto })
  @Post('createMessage')
  async createMessage(@Body() messageDto: MessageDto): Promise<any> {
    console.log('Received messageDto:', messageDto);

    const savedMessage = await this.messageService.createMessage(messageDto);

    await this.emailService.sendEmail(
      'bogdanservetnik80@gmail.com',
      'New Message Created',
      `Message content: ${messageDto.text}`,
    );

    return savedMessage;
  }

  @ApiOperation({ description: 'Get all messages' })
  @ApiResponse({ type: [MessageResponseDto] })
  @Get('getAllMessages')
  async getAllMessages(): Promise<MessageResponseDto[]> {
    const messages = await this.messageService.getMessage();
    console.log('Retrieved messages:', messages);
    return messages;
  }

  @ApiOperation({ description: 'Get messages statistics' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ description: 'Returns statistics of messages' })
  @Get('stats')
  async getMessagesStats() {
    return await this.messageService.getMessagesStats();
  }

  @ApiOperation({ description: 'Get filtered messages' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ description: 'Returns messages based on filter criteria' })
  @Get('filter')
  async getFilteredMessages(
    @Query('text') text?: string,
    @Query('number') number?: number,
  ) {
    const query = { text, number };
    return await this.messageService.getFilteredMessages(query);
  }
}
