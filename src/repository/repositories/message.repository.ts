import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { MessageDto } from 'src/common';

Injectable();
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(data: MessageDto): Promise<any> {
    console.log('Received data:', data);
    return this.prisma.message.create({
      data,
    });
  }

  async getMessage(): Promise<Message[]> {
    return await this.prisma.message.findMany({});
  }
}
