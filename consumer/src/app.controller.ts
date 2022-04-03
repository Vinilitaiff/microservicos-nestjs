import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('storage')
  getStorage(@Payload() message) {
    console.log('Message received', message);
  }

  @MessagePattern('storage-msg')
  getStorageMessage(@Payload() message) {
    console.log('Message received', message);
  }
}
