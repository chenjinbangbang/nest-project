import { Controller, Get, Param, Req, Post, Body, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 验证用户名是否存在
  @Get('check/username/:username')
  async checkUsername(@Param('username') username: string) {
    return await this.authService.checkUsername(username);
  }

  // 查询所有数据
  @Get('list')
  findAll(): Promise<Auth[]> {
    return this.authService.findAll();
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
  async create(@Body() body) {
    console.log(body);
    return await this.authService.create(body);
  }

  // 更新数据
  @Put()
  // @UsePipes(ValidationPipe)
  async update(@Body() body: AuthDto) { //  SwaggerModule在路由处理程序中查找所有使用的@Body()，@Query()和@Param()装饰器来生产API文档。该模块利用反射创建相应的模型定义
    console.log(body);
    return await this.authService.update(body);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.authService.delete(id);
  }

}
