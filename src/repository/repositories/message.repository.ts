import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { MessageDto } from 'src/modules/message';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(messageDto: MessageDto): Promise<Message> {
    return this.prisma.message.create({
      data: {
        ...messageDto,
        createdAt: new Date(), // Явне встановлення поточної дати
      },
    });
  }

  async getMessage(): Promise<Message[]> {
    return await this.prisma.message.findMany({});
  }
  async getFilteredMessages(query: {
    text?: string;
    number?: number;
  }): Promise<Message[]> {
    const filterOptions: any = {};
    if (query.text) filterOptions.text = { contains: query.text };
    if (query.number) filterOptions.number = query.number;

    return await this.prisma.message.findMany({
      where: filterOptions,
    });
  }

  async getMessagesStats() {
    const totalMessages = await this.prisma.message.count();
    const dailyMessages = await this.prisma.$queryRaw<{
      date: Date;
      count: number;
    }>`
      SELECT DATE(createdAt) as date, COUNT(id) as count
      FROM "Message"
      GROUP BY DATE(createdAt)
      ORDER BY date
    `;
    return {
      totalMessages,
      dailyMessages,
    };
  }
}
