import { Controller, Get, Param, Req, Post, Body, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe, HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { InfoService } from './info.service';
import { Info } from 'src/entity/info.entity';
import { InfoDto } from './dto/info.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
// import { JoiValidationPipe } from './pipe/joi-validatePipe';

class InfoDto1 {
  @ApiProperty({
    description: '编号'
  })
  @IsInt()
  readonly id: number;
}

@Controller('info')
// @UseFilters(HttpExceptionFilter) // 异常过滤器。将过滤器设置成控制器作用域
export class InfoController {
  constructor(private readonly infoService: InfoService) { }

  // 验证用户名是否存在
  @Get('check/username/:username')
  async checkUsername(@Param('username') username: string) {
    return await this.infoService.checkUsername(username);
  }

  // 查询所有数据
  @Post('list')
  @ApiBody({ type: InfoDto1 })
  // findAll(@Body() body): Promise<Info[]> {
  findAll(@Body() body) {
    return this.infoService.findAll(body)
  }

  // 按条件查询数据
  @Get()
  find(@Req() req) {
    console.log(req.query.name)
    return this.infoService.find(req.query.name);
  }

  // 根据某个字段查询数据
  @Get(':id')
  getInfoById(@Param('id') id) {
    return this.infoService.getInfoById(id);
  }

  // 新增数据
  @Post()
  // @UsePipes(new JoiValidationPipe())
  // @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async create(@Body() body) {
    console.log(body);
    return await this.infoService.create(body);
  }

  // 更新数据
  @Put()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @UsePipes(new JoiValidationPipe())
  // @UseFilters(HttpExceptionFilter) // 异常过滤器
  async update(@Body() body: InfoDto) { //  SwaggerModule在路由处理程序中查找所有使用的@Body()，@Query()和@Param()装饰器来生产API文档。该模块利用反射创建相应的模型定义

    // console.log(body);
    return await this.infoService.update(body);

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'This is a custom message' }, 403);
    // throw new ForbiddenException();
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.infoService.delete(id);
  }

}
