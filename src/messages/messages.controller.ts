import { Sse, Body, Controller, Get, Post, MessageEvent } from '@nestjs/common'
import { Subject, Observable, interval,from, of } from 'rxjs'
import { CreateMessageDTO } from './DTO/CreateMessageDTO'
import { MessagesService } from './messages.service'
import { Message } from 'src/messages/interfaces/message.interface'
import { map, flatMap, switchMap } from 'rxjs/operators'

@Controller('messages')
export class MessagesController {

  private newMessage: Subject<Message> = new Subject()

  constructor(private messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDTO) {
    this.messagesService.create(createMessageDto)
    this.newMessage.next(createMessageDto)
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll()
  }

  @Sse('/sse')
  serverSentMessages(): Observable<MessageEvent> {
    return this.newMessage.pipe(
      map((message: Message) => {
        return { data: message }
      })
    )
  }
}
