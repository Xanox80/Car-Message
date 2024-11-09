import {
  Body,
  Controller,
  Delete,
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

  @Get()
  async getPaginatedMessages(
    @Query('page') page: string = '1', // Default to page 1
    @Query('pageSize') pageSize: string = '10', // Default to 10 messages per page
  ): Promise<{ messages: MessageResponseDto[]; total: number }> {
    const parsedPage = parseInt(page, 10);
    const parsedPageSize = parseInt(pageSize, 10);
    const { messages, total } = await this.messageService.getPaginatedMessages(
      parsedPage,
      parsedPageSize,
    );

    // You may want to map messages to MessageResponseDto if you have a specific DTO
    return {
      messages,
      total,
    };
  }

  @ApiOperation({ description: 'Delete a message' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: MessageResponseDto })
  @Delete('deleteMessage')
  async deleteMessage(@Query('id') id: number): Promise<MessageResponseDto> {
    const message = await this.messageService.deleteMessage(id);
    return message;
  }

  @ApiOperation({ description: 'Update a message' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: MessageResponseDto })
  @Post('updateMessage')
  async updateMessage(
    @Query('id') id: number,
    @Body() messageDto: MessageDto,
  ): Promise<MessageResponseDto> {
    const message = await this.messageService.updateMessage(id, messageDto);
    return message;
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
