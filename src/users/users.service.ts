import { Injectable } from '@nestjs/common';

// type User = any;
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// 在内存中维护一个硬编码的用户列表，以及一个根据用户检索用户列表的find方法
@Injectable()
export class UsersService {
  // private readonly users: User[];

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {
    // this.users = [
    //   {
    //     userId: 1,
    //     username: 'jin',
    //     password: 'jin'
    //   },
    //   {
    //     userId: 2,
    //     username: 'chris',
    //     password: 'secret'
    //   },
    //   {
    //     userId: 3,
    //     username: 'maria',
    //     password: 'guess'
    //   }
    // ]
  }

  async findOne(username: string, password: string): Promise<User | undefined> {
    // return this.users.find(user => user.username === username);
    return this.userRepo.findOne({ username, password });
    // return this.userRepo.query(`select * from user where username = '${username}'`);
  }

  // 获取用户信息
  userinfo(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  // 获取所有用户信息
  userList(): Promise<User[]> {
    return this.userRepo.find();
  }

}
