import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GoogleSheetsService } from 'src/googleSheet/googleSheet.servise';
import { MessageDto } from 'src/modules/message';

@Injectable()
export class MessageRepository {
  private readonly spreadsheetId =
    '1ZLQuwVzs3E6uloI2t3JL2pdls0oCu1TigUc6wSSB-vo';

  constructor(
    private readonly prisma: PrismaService,
    private readonly googleSheetsService: GoogleSheetsService,
  ) {}

  async createMessage(messageDto: MessageDto): Promise<Message> {
    const savedMessage = await this.prisma.message.create({
      data: messageDto,
    });

    // Додайте дані до Google Sheets
    await this.googleSheetsService.appendData(this.spreadsheetId, 'Аркуш1', [
      [
        savedMessage.id,
        savedMessage.text,
        savedMessage.createdAt.toISOString(),
      ],
    ]);

    return savedMessage;
  }

  async deleteMessage(id: number): Promise<Message> {
    return this.prisma.message.delete({
      where: { id },
    });
  }

  async updateMessage(id: number, messageDto: MessageDto): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data: messageDto,
    });
  }

  async getMessages(page = 1, pageSize = 10): Promise<Message[]> {
    return this.prisma.message.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async getFilteredMessages(query: {
    text?: string;
    number?: number;
  }): Promise<Message[]> {
    const filterOptions: any = {};
    if (query.text) filterOptions.text = { contains: query.text };
    if (query.number) filterOptions.number = query.number;

    return this.prisma.message.findMany({ where: filterOptions });
  }

  async getMessagesStats() {
    const totalMessages = await this.prisma.message.count();
    const dailyMessages = await this.prisma.$queryRaw<{
      date: Date;
      count: number;
    }>`SELECT DATE(createdAt) as date, COUNT(id) as count FROM "Message" GROUP BY DATE(createdAt) ORDER BY date`;

    return { totalMessages, dailyMessages };
  }
}
