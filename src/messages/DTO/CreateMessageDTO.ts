import { Message } from '../interfaces/message.interface';

export class CreateMessageDTO implements Message {
  message: string;
  username: string;
}
