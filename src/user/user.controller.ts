import { Controller, Post, Body, Header, Headers, Head, Param, Delete, HttpCode, Get, Optional, Inject, Query, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto'; // 请求体绑定
import { Observable, of } from 'rxjs';
import { User } from 'src/entity/user.entity';
import { ApiTags, ApiResponse, ApiBody, ApiProperty, ApiParam, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max } from 'class-validator';
import { UserPipe } from 'src/pipe/user.pipe';

// 设置Joi的schema
import * as Joi from '@hapi/joi';
let userSchema = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number().integer().min(6).max(66).required()
})

class userSchemaDto {
  @ApiProperty({
    description: '姓名'
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: '年龄',
    default: 1
  })
  // @IsInt()
  // @Min(6)
  // @Max(66)
  readonly age: number;
}

class UserA {
  @ApiProperty({
    description: '姓名'
  })
  @IsString()
  readonly name: string;
}

// 用户控制器
@ApiTags('用户相关')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { } // 注入UserService

  // 基于属性进行注入
  // @Inject()
  // private readonly userService: UserService;

  @Post('a')
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

  @Post('e')
  @ApiBody({ type: UserA })
  async e(@Body() body: UserA) {
    return await this.userService.e(body);
  }

  @Post('f')
  @ApiBody({ type: UserA })
  async f(@Body() body: UserA) {
    return await this.userService.f(body);
  }

  @Get('pipe')
  @ApiOperation({ summary: '管道接口' })
  // @ApiQuery({ name: 'name' }) // 有userSchemaDto实体的话，可不用
  // @ApiQuery({ name: 'age' })
  @UsePipes(new UserPipe(userSchema)) // 绑定管道
  pipe(@Query() query: userSchemaDto) {
    // console.log(query);
    return query;
  }

  @Post('pipe')
  @ApiOperation({ summary: '管道接口' })
  @UsePipes(new UserPipe(userSchema))
  // @ApiBody({ type: userSchemaDto }) // 有userSchemaDto实体的话，等价于这个
  pipePost(@Body() body: userSchemaDto) {
    // console.log(query);
    return body;
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
