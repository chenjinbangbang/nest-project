import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'; // 不要忘记将jwtService提供者注入到AuthService
import { jwtConstants } from './constants';

// 检索用户并验证密码
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  // 验证用户，先在数据查找该用户， 然后把result放到token信息里面，在local.strategy.ts执行
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username, pass);

    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    if (user) {
      return user;
    }
    return null;
  }

  // 登录方法，在app.controller.ts执行，把需要的用户信息存到token里面
  async login(user: any) {
    const payload = { username: user.username, sub: user.id }; //sub属性：保持我们的id值域JWT标准一致，
    console.log('token信息：', payload)
    return {
      access_token: this.jwtService.sign(payload), //sign()函数：用于从用户对象属性的子集生产jwt
      expiresIn: jwtConstants.expiresIn * 1000
    }
  }
}
