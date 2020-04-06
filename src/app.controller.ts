import { Controller, Get, Request, Post, UseGuards, Render, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiBody, ApiHeader, ApiSecurity, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';

class userDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
}

// @ApiBearerAuth()
// ApiHeader无作用
// @ApiHeader({
//   name: 'Authorization',
//   description: 'token'
// })

@ApiTags('基础服务')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Get()
  @Render('default/index')
  getHello(@Request() req, @Response() res) {

    // 设置cookie（异步）
    // res.cookie('username', '张三',
    //   {
    //     maxAage: 1000 * 60 * 10,
    //     httpOnly: true,
    //     signed: true // 是否加密
    //   }
    // );

    // // 获取cookie
    // // console.log(req.cookies.username);
    // console.log(req.signedCookies.username); // 获取加密后的cookie

    // 设置session
    req.session.username = "哈哈哈";

    // 获取session
    console.log(req.session.username);

    return { name: "张三", age: 20 };
  }

  // 应用内置的守卫来启动护照本地流
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: userDto })
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.body);
    console.log(req.user);
    // return req.user;
    return this.authService.login(req.user);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
