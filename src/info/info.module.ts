import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

import { Info } from 'src/entity/info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Info])], // 注册实体类
  controllers: [InfoController],
  providers: [InfoService]
})
export class InfoModule {

}
