import { Injectable } from '@nestjs/common'
import { Message } from 'src/messages/interfaces/message.interface'
import { v4 as uuidv4 } from 'uuid'
import { Database } from 'ark.db'

@Injectable()
export class MessagesService {
  private db

  constructor() {
    this.db = new Database()
  }

  async create(message: Message) {
    await this.db.set(uuidv4(), message)
  }

  async findAll(): Promise<Message[]> {
    const data = await this.db.all()
    // Transforms the key-indexed Object into an array
    return Object.keys(data).map((k) => data[k])
  }
}
