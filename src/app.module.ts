import { Module, NestModule, MiddlewareConsumer, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { logger } from './common/middleware/logger.middleware';

// CatsController和CatsService属于同一个应用程序域，应该考虑将它们移动到一个功能模块下，即CatsModule
import { CatsController } from './cats/cats.controller';
// import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { APP_PIPE } from '@nestjs/core';

// @Module()装饰器：将元数据附加到模块类
@Module({
  imports: [CatsModule], // 导入模块的列表，这些模块导出了此模块中所需提供者
  controllers: [AppController], // 必须创建的一组控制器

  // 由nest注入器实例化的提供者，并且可以至少在整个模块中共享
  providers: [
    AppService,

    // 从任何模块外部注册的全局管道无法注入依赖，因为它们不属于任何模块。为了解决这个问题，可以使用以下构造直接为任何模块设置管道
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],

  // exports: [] // 由本模块提供并应在其他模块中可用的提供者的子集（service作为共享模块，一旦创建就能被任意模块重复使用）
})

export class AppModule implements NestModule {
  // 中间件不能再@Module()装饰器中列出，我们必须使用模块类的configure()方法来设置它们。包含中间件的模块必须实现NestModule接口。我们将LoggerMiddleware设置在ApplicationModule层上
  configure(consumer: MiddlewareConsumer) { // MiddlewareConsumer：是一个帮助类，它提供了几种内置方法来管理中间件
    consumer
      .apply(logger) // apply()方法可以使用单个中间件，也可以使用多个参数来指定多个中间件，多个中间件用逗号隔开
      // .exclude({ path: 'cats', method: RequestMethod.GET }) // exclude()方法：将某些路由排除在中间件应用之外，该方法采用一个或多个对象标识要排除的path和method
      // .forRoutes('cats')
      // .forRoutes({ path: 'cats' method: RequestMethod.GET }); // 设置路由路径的对象和请求方法（注意：GET请求对动态路由无效）
      .forRoutes(CatsController) // forRoutes()方法可接受一个字符串，多个字符串，对象，一个控制器类甚至多个控制器类

  }
}
