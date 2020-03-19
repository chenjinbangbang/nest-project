import { Controller, Get, Param, Req, Post, Body, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe, HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/entity/auth.entity';
import { AuthDto } from './dto/auth.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
// import { JoiValidationPipe } from './pipe/joi-validatePipe';

class AuthDto1 {
  @ApiProperty({
    description: '编号'
  })
  @IsInt()
  readonly id: number;
}

@Controller('auth')
// @UseFilters(HttpExceptionFilter) // 异常过滤器。将过滤器设置成控制器作用域
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 验证用户名是否存在
  @Get('check/username/:username')
  async checkUsername(@Param('username') username: string) {
    return await this.authService.checkUsername(username);
  }

  // 查询所有数据
  @Post('list')
  @ApiBody({ type: AuthDto1 })
  // findAll(@Body() body): Promise<Auth[]> {
  findAll(@Body() body) {
    return this.authService.findAll(body)
  }

  // 按条件查询数据
  @Get()
  find(@Req() req) {
    console.log(req.query.name)
    return this.authService.find(req.query.name);
  }

  // 根据某个字段查询数据
  @Get(':id')
  getAuthById(@Param('id') id) {
    return this.authService.getAuthById(id);
  }

  // 新增数据
  @Post()
  // @UsePipes(new JoiValidationPipe())
  // @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async create(@Body() body) {
    console.log(body);
    return await this.authService.create(body);
  }

  // 更新数据
  @Put()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @UsePipes(new JoiValidationPipe())
  // @UseFilters(HttpExceptionFilter) // 异常过滤器
  async update(@Body() body: AuthDto) { //  SwaggerModule在路由处理程序中查找所有使用的@Body()，@Query()和@Param()装饰器来生产API文档。该模块利用反射创建相应的模型定义

    // console.log(body);
    return await this.authService.update(body);

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'This is a custom message' }, 403);
    // throw new ForbiddenException();
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.authService.delete(id);
  }

}
