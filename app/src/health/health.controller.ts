import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('health')
export class HealthController {
  constructor(@InjectQueue('test-queue') private readonly testQueue: Queue) { }

  @Get()
  async check() {
    await this.testQueue.add('test-job', {
      message: 'Health check job',
    });
    return 'OK';
  }
}
