import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('守卫');

    // 获取session
    console.log(context.switchToHttp().getRequest().session.username);

    // 获取cookie
    console.log(context.switchToHttp().getRequest().session.cookie);

    return true;
  }
}
