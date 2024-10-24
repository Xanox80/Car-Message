import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageDto, MessageResponseDto } from './dto';
import { EmailService } from '../email/email.service'; // Імпортуйте сервіс для листів

@Controller('message')
@ApiTags('Message')
@ApiBearerAuth()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly emailService: EmailService, // Інжектуйте EmailService
  ) {}

  @ApiOperation({ description: 'Create a new message' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: MessageResponseDto })
  @Post('createMessage')
  async createMessage(@Body() messageDto: MessageDto): Promise<any> {
    console.log('Received messageDto:', messageDto);

    const savedMessage = await this.messageService.createMessage(messageDto);

    // Відправка повідомлення на Gmail
    await this.emailService.sendEmail(
      'recipient@gmail.com', // Змінити на отримувача
      'New Message Created',
      `Message content: ${messageDto.text}`,
    );

    return savedMessage;
  }
}
