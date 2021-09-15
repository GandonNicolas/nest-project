import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateMessageDTO } from './DTO/CreateMessageDTO';
import { MessagesService } from './messages.service';
import { Message } from 'src/messages/interfaces/message.interface';


@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Post()
    async create(@Body() createMessageDto: CreateMessageDTO) {
        this.messagesService.create(createMessageDto)
    }

    @Get()
    async findAll(): Promise<Message[]> {
        return this.messagesService.findAll()
    }
}
