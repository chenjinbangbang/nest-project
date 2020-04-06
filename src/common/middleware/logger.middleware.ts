// 应用中间件
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
// import { LogService } from 'src/log/log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    // private readonly logService: LogService,
    private readonly userService: UserService
  ) { }

  use(req: Request, res: Response, next: Function) {

    let result = this.userService.createLog();
    // console.log(result)
    // console.log('中间件...');
    next();
  }
}

// 函数式中间件（当您的中间件没有任何依赖关系时，我们可以考虑使用函数式中间件）
// export function logger(req, res, next) {
//   // console.log(req.headers)
//   console.log('中间件...');
//   next();
// }