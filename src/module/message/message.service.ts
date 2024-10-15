import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../repository/repositories/message.repository';
import { MessageDto, MessageRequestDto } from 'src/common';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async createMessage(messageDto: MessageDto): Promise<any> {
    console.log('Data received in createMessage:', messageDto);
    return this.messageRepository.createMessage(messageDto);
  }

  async getMessage() {
    return await this.messageRepository.getMessage();
  }
}
