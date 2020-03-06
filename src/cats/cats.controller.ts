import { Controller, Get, Req, Post, HttpCode, Header, Param, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { of } from 'rxjs';

@Controller('cats')
export class CatsController {

  // 端点装饰器有@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), @Head(), @All()的HTTP请求方法

  @Post('create')
  // @HttpCode(204) // 更改状态码
  // @Header('Cache-Control', 'none') // 指定自定义响应头
  create(@Req() req: Request): string {
    console.log(req.body)
    return req.body;
  }

  // @Req()装饰器：将请求对象注入处理程序
  @Get() // @Get('ab*cd')：路由通配符，将匹配任何字符组合，如：abcd,ab_cd,abecd等等
  findAll(@Req() req: Request): string {
    console.log(req.query)
    return 'This action returs all cats';
  }

  @Get(':id') // @Param()装饰器，获取动态数据，动态路由
  findOne(@Param() params): string { // 可写成这样，直接获取id：findOne(@param('id') id): string{...}
    console.log(params);
    return params;
  }

  // 每个异步函数都必须返回Promise。这意味着您可以返回延迟值，而Nest将自行解析它
  @Get('a')
  async find(): Promise<any[]> {
    return [];
  }

  // 通过返回RxJS observable流，Nest路由处理程序更强大，Nest将自动订阅下面的源并获取最后发出的值（在流完成后）
  // @Get('b')
  // findA(): Observable<any[]> {
  //   return of([]);
  // }

  @Post()
  create1(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll1(@Res() res: Response) {
    res.status(HttpStatus.OK).json({});
  }
}
