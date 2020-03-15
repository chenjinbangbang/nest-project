import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { RolesGuard } from './roles.guard';
// import { ValidationPipe } from '@nestjs/common';
// import { logger } from './common/middleware/logger.middleware';

// swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // 设置全局中间件，一次性将中间件绑定到每个注册路由
  // app.useGlobalPipes(new ValidationPipe()) // 由于ValidationPipe被创建为尽可能通用，所以我们将把它设置为一个全局作用域的管道，用于整个应用程序中的每个路由处理器
  // app.useGlobalGuards(new RolesGuard()); // 绑定全局守卫
  // app.useGlobalFilters(new HttpExceptionFilter()); // 异常过滤器

  // 配置swagger选项对象
  const options = new DocumentBuilder() // DocumentBuilder有助于构建符合OpenAPI规范的基础文档。
    .setTitle('Hot 接口文档') // 标题
    .setDescription('The hot API description') // 描述
    .setVersion('1.0') // 版本
    .addTag('接口文档')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // 1. Swagger UI的挂载路径。2. 应用程序实例。3. 上面已经实例化的文档对象document

  await app.listen(3002);
}
bootstrap();
