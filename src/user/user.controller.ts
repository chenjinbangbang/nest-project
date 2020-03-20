import { Controller, Post, Body, Header, Headers, Head, Param, Delete, HttpCode, Get, Optional, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto'; // 请求体绑定
import { Observable, of } from 'rxjs';
import { User } from 'src/entity/user.entity';
import { ApiTags, ApiResponse, ApiBody, ApiProperty, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UserA {
  @ApiProperty({
    description: '姓名'
  })
  @IsString()
  readonly name: string;
}

// 用户控制器
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { } // 注入UserService

  // 基于属性进行注入
  // @Inject()
  // private readonly userService: UserService;

  @Post()
  @ApiBody({ type: UserA })
  async a(@Body() body: UserA) {
    return await this.userService.a(body);
  }

  @Post('b')
  @ApiBody({ type: UserA })
  async b(@Body() body: UserA) {
    return await this.userService.b(body);
  }

  @Post('c')
  @ApiBody({ type: UserA })
  async c(@Body() body: UserA) {
    return await this.userService.c(body);
  }

  @Post('d')
  @ApiBody({ type: UserA })
  async d(@Body() body: UserA) {
    return await this.userService.d(body);
  }

  // @Post()
  // async create(@Body() body: UserDto) {
  //   await this.userService.create(body);
  //   return body;
  // }

  // @Get()
  // async findAll() {
  //   return this.userService.findAll();
  // }

  // @Post()
  // findAll(@Body() data: UserDto, @Headers() header) {
  //   console.log(header);
  //   return this.userService.findAll();
  // }

  // @Head(':id')
  // @Header('x-version', '1.0.0')
  // head(@Param('id') id: number) {
  //   console.log(id)
  // }

  // @Delete(':id')
  // // @HttpCode(204) // 响应状态码
  // delete(@Param('id') id: number) {
  //   console.log(id)
  //   // 删除成功不需要返回数据
  // }

  // 异步
  // @Get('promise')
  // async findAll1(): Promise<any[]> {
  //   return Promise.resolve([]);
  // }
  // // RxJs中提供了Observable对象，NestJs可以自动订阅并获取最后一次产生的值
  // @Get('rxjs')
  // findALl2(): Observable<any[]> {
  //   return of([]); // of为Rxjs操作符
  // }

}
