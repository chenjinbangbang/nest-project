import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
// import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiBody, ApiHeader, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';
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
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) { }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  constructor(private readonly authService: AuthService) { }

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
