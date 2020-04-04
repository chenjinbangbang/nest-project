import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // 每分钟的30秒执行一次
  @Cron('30 * * * * *')
  handleCron() {
    this.logger.debug('每分钟的30秒执行一次');
    console.log('每分钟的30秒执行一次')
  }

  // 每5秒调用一次
  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron1() {
    this.logger.debug('每5秒调用一次')
  }
}
