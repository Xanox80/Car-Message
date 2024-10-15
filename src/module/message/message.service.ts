import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../repository/repositories/message.repository';
import { MessageDto, MessageRequestDto } from 'src/common';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async createMessage(messageParams: MessageRequestDto) {
    console.log('Received messageParams:', messageParams);
    return await this.messageRepository.createMessage(messageParams);
  }

  async getMessage() {
    return await this.messageRepository.getMessage();
  }
}
