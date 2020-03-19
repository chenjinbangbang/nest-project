import { Injectable, Scope } from '@nestjs/common';
// import { User } from './interfaces/user.interface';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Photo } from 'src/entity/photo.entity';

// 业务类
@Injectable()
// @Injectable({ scope: Scope.TRANSIENT }) // 服务提供者的Scope
export class UserService {
  // private readonly users: User[] = [];
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

  // create(user: User) {
  //   this.users.push(user);
  // }

  // findAll(): User[] {
  //   console.log(this.users);
  //   return this.users;
  // }

  a(data) {
    return this.userRepo.createQueryBuilder('user')
      // .leftJoinAndSelect('user.photos', 'photo')
      // .innerJoinAndSelect('user.photos', 'photo')

      // .leftJoin('user.photos', 'photo') // 不加选择加入，不返回photos
      // .innerJoin('user.photos', 'photo') 

      // .innerJoinAndSelect(Photo, 'photo', 'photo.userId = user.id') // 连接任何实体或表
      // .innerJoinAndSelect('photos', 'photo', 'photo.userId = user.id')

      // .leftJoinAndMapOne('user.profilePhoto', 'user.photos', 'photo') // 连接和映射功能（就是photos改名为profilePhoto）
      .leftJoinAndMapMany('user.profilePhoto', 'user.photos', 'photo')

      // .where('user.name = :name', data)
      // .getOne();
      // .getMany();
      // .getSql(); // 获取生成的查询

      .printSql() // 该查询将返回用户，并将使用的sql语句打印到控制台
      .getMany();
  }

  b(data) {
    return this.userRepo.createQueryBuilder('user')
      .select('sum(user.photosCount)', 'sum')
      .where('user.id = :id', { id: 1 })
      .getRawOne(); // 获取原始结果
  }
}
