// 应用中间件
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: Function) {
//     console.log('Request...');
//     next();
//   }
// }

// 函数式中间件（当您的中间件没有任何依赖关系时，我们可以考虑使用函数式中间件）
export function logger(req, res, next) {
  // console.log(req.headers)
  console.log('request...');
  next();
}