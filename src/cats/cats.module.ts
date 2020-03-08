import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// @Global装饰器：是全局模块，使模块成为全局作用域，全局模块应该只注册一次，最好由根或核心模块注册。想要使用CatsService的模块则不需要再imports数组中导入CatsModule（一般用于helper，数据库连接等等）
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {
  // 提供者也可以注入到模块（类）中（例如：用于配置目的）
  // constructor(private readonly catsService: CatsService) { }
}
