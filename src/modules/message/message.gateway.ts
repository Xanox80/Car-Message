import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { MessageDto } from './dto';
import { Logger } from '@nestjs/common';
import { Message } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  private readonly logger = new Logger(MessageGateway.name);

  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createMessage')
  async handleCreateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() messageDto: MessageDto,
  ) {
    const message = await this.messageService.createMessage(messageDto);
    this.server.emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  async handleFindAllMessages() {
    const messages = await this.messageService.getMessage();
    return messages;
  }

  @SubscribeMessage('notifyNewMessage')
  async notifyNewMessage(@MessageBody() message: Message) {
    this.server.emit('newMessageNotification', message);
  }
}
