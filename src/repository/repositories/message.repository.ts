import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { MessageDto } from 'src/common';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(data: MessageDto): Promise<Message> {
    console.log('Received data:', data);
    return this.prisma.message.create({
      data: {
        text: data.text,
        number: data.number,
      },
    });
  }

  async getMessage(): Promise<Message[]> {
    return await this.prisma.message.findMany({});
  }
}
