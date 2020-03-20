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
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Photo) private readonly photoRepo: Repository<Photo>) { }

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
      // .getMany(); // 不能查询到*，原始数据（sum(*)）
      // .getSql(); // 获取生成的查询

      .printSql() // 该查询将返回用户，并将使用的sql语句打印到控制台
      .getMany();
  }

  b(data) {
    return this.userRepo.createQueryBuilder('user')
      // .select('sum(user.age)', 'sum')
      // .where('user.id = :id', { id: 1 })

      // .setLock('pessimistic_read')

      // .getRawOne(); // 获取原始结果
      .getRawMany();

    // .stream(); // 流结果数据
  }

  // 查询测试
  c(data) {
    return this.userRepo.createQueryBuilder('user')
      .select(['user.*'])
      // .leftJoinAndSelect('')
      .getRawMany();
    // .getMany();
    // .getSql();
  }

  async d(data) {

    // 使用子查询
    // select * from user where age > (select age from user where name = 'user');
    // 优雅的方法
    // return this.userRepo.createQueryBuilder('user')
    //   .where(qb => {
    //     const subQuery = qb.subQuery()
    //       .select('user.age')
    //       .from(User, 'user')
    //       .where('user.name = :name')
    //       .getQuery();
    //     return `user.age > (${subQuery})`;
    //   })
    //   .setParameter('name', 'user')
    //   .getMany();

    // 构建一个单独的查询生成器并使用其生成的SQL
    const userQb = await this.userRepo.createQueryBuilder('user')
      .select('user.age')
      .where('user.name = :name', { name: 'user' });

    return this.userRepo.createQueryBuilder('user')
      // .from(`user.age > (${userQb.getQuery()})`, 'user') // 不生效
      .where(`user.age > (${userQb.getQuery()})`) // userQb.getQuery()：获取userQb的sql语句
      .setParameters(userQb.getParameters()) // userQb.getParameters()：获取userQb的参数
      // .getSql();
      .getMany();
    // .getRawMany();

    // return this.userRepo.createQueryBuilder('user')
    //   .select('user.name', 'name')
    //   .from(subQuery => {
    //     return subQuery
    //       .select('user.name', 'name')
    //       .from(User, 'user')
    //       .where('user.name = :name', { name: 'user' })
    //   }, 'user')
    //   .getRawMany();

  }


}

