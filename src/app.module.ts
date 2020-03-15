import { Module, NestModule, MiddlewareConsumer, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { logger } from './common/middleware/logger.middleware';

// CatsController和CatsService属于同一个应用程序域，应该考虑将它们移动到一个功能模块下，即CatsModule
import { CatsController } from './cats/cats.controller';
// import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { APP_PIPE, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

// 连接mysql数据库
import { TypeOrmModule } from '@nestjs/typeorm'; // 使用TypeORM是因为它是TypeScript中最成熟的对象关系映射器（ORM）
import { Connection } from 'typeorm';
import { HttpExceptionFilter } from './http-exception.filter';

// @Module()装饰器：将元数据附加到模块类
@Module({
  imports: [
    // forRoot()方法接受与来自TypeORM包的createConnection()相同的配置对象
    TypeOrmModule.forRoot(
      {
        type: 'mysql', // 数据库类型
        host: 'localhost', // 数据库ip地址
        port: 3306, // 端口
        username: 'root', // 登录名
        password: 'root', // 密码
        database: 'test', // 数据库名称
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件，静态全局路径不适用于webpack热重载
        // entities: [Photo],
        synchronize: true // 定义数据库表结构与实体类字段同步（这里一旦数据库少了字段就会自动加入，根据需要来使用）
      }
    ),
    CatsModule, UserModule, AuthModule], // 导入模块的列表，这些模块导出了此模块中所需提供者
  controllers: [AppController], // 必须创建的一组控制器

  // 由nest注入器实例化的提供者，并且可以至少在整个模块中共享
  providers: [
    AppService,

    // 在依赖注入方面，从任何模块外部注册的全局管道无法注入依赖，因为它们不属于任何模块。为了解决这个问题，可以使用以下构造直接为任何模块设置管道
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },

    // 在依赖注入方面，从任何模块外部注册的全局守卫不能插入依赖项，因为它们不属于任何模块。为了解决这个问题，可以使用以下构造直接从任何模块设置一个守卫
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },

    // 全局过滤器用于整个应用程序、每个控制器和每个路由处理程序。就依赖注入而言，从任何模块外部注册的全局过滤器（使用上面示例中的 useGlobalFilters()）不能注入依赖，因为它们不属于任何模块。为了解决这个问题，你可以注册一个全局范围的过滤器直接为任何模块设置过滤器：
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],

  // exports: [] // 由本模块提供并应在其他模块中可用的提供者的子集（service作为共享模块，一旦创建就能被任意模块重复使用）
})

export class AppModule implements NestModule {
  // 建立连接。一旦完成，TypeORM连接和EntityManager对象就可以在整个项目中注入（不需要导入任何模块）
  constructor(private readonly connection: Connection) { }

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
