import { Sse, Body, Controller, Get, Post, MessageEvent } from '@nestjs/common'
import { Observable, interval } from 'rxjs'
import { CreateMessageDTO } from './DTO/CreateMessageDTO'
import { MessagesService } from './messages.service'
import { Message } from 'src/messages/interfaces/message.interface'
import { map } from 'rxjs/operators'

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDTO) {
    console.log(createMessageDto)
    this.messagesService.create(createMessageDto)
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll()
  }

  @Sse()
  serverSentMessages(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { message: 'hello', username: 'me' } }))
    );
  }
}
