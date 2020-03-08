import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // 设置全局中间件，一次性将中间件绑定到每个注册路由
  // app.useGlobalPipes(new ValidationPipe()) // 由于ValidationPipe被创建为尽可能通用，所以我们将把它设置为一个全局作用域的管道，用于整个应用程序中的每个路由处理器
  await app.listen(3002);
}
bootstrap();
