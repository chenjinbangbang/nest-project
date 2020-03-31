import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entity/log.entity';
import { Repository } from 'typeorm';

// @InjectRepository(User) private readonly userRepo: Repository<User>,

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private readonly logRepo: Repository<Log>) { }

  // 添加一条日志
  createLog() {
    let data = new Log();
    data.detail = '发布一个任务';

    return this.logRepo.save(data);
  }

}
