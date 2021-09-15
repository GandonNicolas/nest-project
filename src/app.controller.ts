import { Get, Controller, Render } from '@nestjs/common'
import { MessagesService } from './messages/messages.service'

@Controller()
export class AppController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  @Render('index')
  async root() {
    const messages = await this.messagesService.findAll()
    return { messages: messages }
  }
}
