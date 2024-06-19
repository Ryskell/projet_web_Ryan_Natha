import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('test-queue')
export class QueueProcessor {
  @Process('test-job')
  handleTestJob(job: Job) {
    console.log('Processing job:', job.data);
  }
}
