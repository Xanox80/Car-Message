import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/repository';
import { MessageDto } from './dto';
import { PrismaService } from 'prisma/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly prisma: PrismaService,
  ) {}

  async createMessage(messageDto: MessageDto): Promise<any> {
    console.log('Data received in createMessage:', messageDto);
    return this.messageRepository.createMessage(messageDto);
  }

  async getPaginatedMessages(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ messages: Message[]; total: number }> {
    const messages = await this.messageRepository.getMessages(page, pageSize);
    const total = await this.prisma.message.count();
    return {
      messages,
      total,
    };
  }

  async deleteMessage(id: number): Promise<Message> {
    return this.messageRepository.deleteMessage(id);
  }

  async updateMessage(id: number, messageDto: MessageDto): Promise<Message> {
    return this.messageRepository.updateMessage(id, messageDto);
  }
  async getMessagesStats() {
    const totalMessages = await this.prisma.message.count();
    const dailyMessages = await this.prisma.message.groupBy({
      by: ['createdAt'],
      _count: { id: true },
    });
    return {
      totalMessages,
      dailyMessages: dailyMessages.map((item) => ({
        date: item.createdAt,
        count: item._count.id,
      })),
    };
  }
  async getFilteredMessages(query: { text?: string; number?: number }) {
    return this.messageRepository.getFilteredMessages(query);
  }
}
