import { Controller, Get, Req, Post, HttpCode, Header, Param, Res, HttpStatus, Body, Response, HttpException, UsePipes, ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from 'src/roles.guard';

@Controller('cats')
// @UseGuards(RolesGuard) // @UseGuards()装饰器：设置一个控制范围的守卫
@UseGuards(new RolesGuard()) // 与管道和异常过滤器一样，我们也可以传递一个实例
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  // 端点装饰器有@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), @Head(), @All()的HTTP请求方法
  /**
   * @Req() req（使用req.query,req.body,req.params获取请求体，要使用return ...进行响应）
   * @Body() body（等同于上面req.body获取Http body参数）
   * @Params() param（等同于上面req.params获取动态路由参数）
   * @Response() res（这个必须使用res.status(HttpStatus.OK)。json(...)进行响应，不能使用return ...）（不推荐使用）
   */

  // @Get(':id')
  // async getUser(@Req() req) {
  //   const user = [{ name: 'uuuu' }];
  //   console.log('动态路由：', req.params);
  //   // res.status(HttpStatus.OK).json(user);
  //   return req.params;
  // }

  // 使用转换管道
  // @Get(':id')
  // async findOne(@Param('id', new ParseIntPipe()) id) {
  //   return await this.catsService.findOne(id);
  // }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id) {
    return await this.catsService.findOne(id);
  }

  @Get()
  getUserB(@Req() req) {
    // console.log('get: ', req.query);
    // return req.query

    // 基础异常类：HttpException（第一个参数response：定义JSON响应体，它可以是string或object，第二个参数status：定义HTTP状态代码）
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'this is a custom message'
    }, 403);
  }

  // 管道
  // @Post('pipe')
  // @UsePipes(new JoiValidsationPipe(createCatSchema)) // @UsePipes()装饰器：创建一个管道实例，并将其传递给joi验证
  // async create1(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto)
  // }
  @Post('pipe')
  // async create1(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  // @UsePipes(new ValidationPipe()) // 要在方法级别设置管道，您需要使用UsePipe()装饰器
  // @UsePipes(ValidationPipe) // 另一种可用的方法是直接传入类（而不是实例），让框架承担实例化责任，并启用依赖注入
  async create1(@Body() createCatDto: CreateCatDto) {
    console.log('验证成功: ', createCatDto);
    await this.catsService.create(createCatDto);
    return createCatDto;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
    // return body;
    this.catsService.create(createCatDto);
  }

  @Get('list')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }



  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   console.log(createCatDto);
  //   this.catsService.create(createCatDto);
  // }

  // @Get()
  // async findAll(): Promise<Cat[]> {
  //   return this.catsService.findAll();
  // }


  // @Post('create')
  // // @HttpCode(204) // 更改状态码
  // // @Header('Cache-Control', 'none') // 指定自定义响应头
  // create(@Req() req: Request): string {
  //   console.log(req.body)
  //   return req.body;
  // }

  // // @Req()装饰器：将请求对象注入处理程序
  // @Get() // @Get('ab*cd')：路由通配符，将匹配任何字符组合，如：abcd,ab_cd,abecd等等
  // findAll(@Req() req: Request): string {
  //   console.log(req.query)
  //   return 'This action returs all cats';
  // }

  // @Get(':id') // @Param()装饰器，获取动态数据，动态路由
  // findOne(@Param() params): string { // 可写成这样，直接获取id：findOne(@param('id') id): string{...}
  //   console.log(params);
  //   return params;
  // }

  // // 每个异步函数都必须返回Promise。这意味着您可以返回延迟值，而Nest将自行解析它
  // @Get('a')
  // async find(): Promise<any[]> {
  //   return [];
  // }


  // 通过返回RxJS observable流，Nest路由处理程序更强大，Nest将自动订阅下面的源并获取最后发出的值（在流完成后）
  // @Get('b')
  // findA(): Observable<any[]> {
  //   return of([]);
  // }

  // 类库特有方式，暂不推荐
  // @Post()
  // create1(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  // @Get()
  // findAll1(@Res() res: Response) {
  //   res.status(HttpStatus.OK).json({});
  // }
}
