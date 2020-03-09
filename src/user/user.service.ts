import { Injectable, Scope } from '@nestjs/common';
import { User } from './interfaces/user.interface';

// 业务类
@Injectable()
// @Injectable({ scope: Scope.TRANSIENT }) // 服务提供者的Scope
export class UserService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    console.log(this.users);
    return this.users;
  }
}
