import { Controller, Get } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  ClientRMQ,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // KAFKA
  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:9093'],
  //     },
  //     consumer: {
  //       groupId: 'consumer',
  //     },
  //   },
  // })
  // client: ClientKafka;

  //RabbitMQ
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'storage',
      queueOptions: {
        durable: false,
      },
    },
  })
  client: ClientRMQ;

  //Necessario no kafka, no rabbitmq ja tem esse padrao de resposta nativa
  // async onModuleInit() {
  //   this.client.subscribeToResponseOf('storage-msg');
  //   await this.client.connect();
  // }

  @Get('/emit') //Geralmente é post, mas para teste vou fazer um get para rodar pelo navegador
  sendToStorage() {
    return this.client.emit('storage', {
      message: 'remove ice cream from storage',
    });
  }

  @Get('/msg')
  sendToStorageMsg() {
    return this.client.send('storage-msg', {
      message: 'remove pizza from storage',
    });
  }
}
