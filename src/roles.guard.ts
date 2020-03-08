import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

// 基于角色认证
@Injectable()
export class RolesGuard implements CanActivate {
  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   console.log('context: ', context);
  //   return true;
  // }

  // 为了访问路由的角色（自定义元数据），使用Reflector帮助类
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}