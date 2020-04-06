import { Injectable, Scope } from '@nestjs/common';
// import { User } from './interfaces/user.interface';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Photo } from 'src/entity/photo.entity';
import { Log } from 'src/entity/log.entity';
import { removeRawMany } from 'src/common/global';

// 业务类
@Injectable()
// @Injectable({ scope: Scope.TRANSIENT }) // 服务提供者的Scope
export class UserService {
  // private readonly users: User[] = [];
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Photo) private readonly photoRepo: Repository<Photo>,
    @InjectRepository(Log) private readonly logRepo: Repository<Log>
  ) { }

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
      .leftJoinAndSelect('user.logs', 'log')
      // .innerJoinAndSelect('user.photos', 'photo')

      // .leftJoin('user.photos', 'photo') // 不加选择加入，不返回photos
      // .innerJoin('user.photos', 'photo') 

      // .innerJoinAndSelect(Photo, 'photo', 'photo.userId = user.id') // 连接任何实体或表
      // .innerJoinAndSelect('photos', 'photo', 'photo.userId = user.id')

      // .leftJoinAndMapOne('user.profilePhoto', 'user.photos', 'photo') // 连接和映射功能（就是photos改名为profilePhoto）
      // .leftJoinAndMapMany('user.profilePhoto', 'user.photos', 'photo')

      // .where('user.name = :name', data)
      // .getOne();
      // .getMany(); // 不能查询到*，原始数据（sum(*)）
      // .getSql(); // 获取生成的查询

      // .printSql() // 该查询将返回用户，并将使用的sql语句打印到控制台
      .getMany();
    // .getRawMany();
  }

  async b(data) {
    let res = await this.userRepo.createQueryBuilder('user')
      // .select('name', 'name')
      // .select('sum(user.age)', 'sum')
      // .where('user.id = :id', { id: 1 })
      // .leftJoinAndSelect(User, 'u', '')

      // .setLock('pessimistic_read')

      // .getRawOne(); // 获取原始结果（比如count(*),内左右连接的数据）
      .getMany();

    // .stream(); // 流结果数据

    console.log(res);
    return res;
  }

  // 查询测试
  async c(data) {

    // const userQb = await this.userRepo.createQueryBuilder('user')
    //   .select('count(*)', 'reffer_num')
    //   .from(User, 'user')
    //   .where('user.refferId = u.id')
    //   .leftJoinAndSelect(User, 'u', 'users.refferId = u.id');

    // console.log(userQb.getQuery());

    let res = await this.userRepo.createQueryBuilder('users')
      .select(['users.*', 'u.name referrer_name'])
      // .addSelect('(count(user.*)', 'num')
      // .from(User, 'user')
      // .where('user.refferId = users.id)')
      // .addSelect(`${userQb.getQuery()}`)
      // .addSelect('(count(*) user where user.refferId = users.id)', 'reffer_num')
      .leftJoinAndSelect(User, 'u', 'users.refferId = u.id')

      // .skip(0)
      // .take(2)
      .offset(0)
      .limit(3)
      .getRawMany();
    // .getMany();
    // .getSql();

    removeRawMany(res, 'u_');

    return res;
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

  e(data) {
    // return this.userRepo.find();
    // return this.userRepo.find({ relations: ['logs'] });

    return this.userRepo.createQueryBuilder('user')
      .select('user.id')
      // .leftJoinAndSelect(Log, 'log', 'log.userId = user.id')
      .leftJoinAndSelect('user.logs', 'log')
      // .getRawMany();
      .getMany();

  }

  async f(data) {

    // console.log(this.userRepo.hasId(data))
    // console.log(this.userRepo.getId(data))

    // return this.userRepo.query('select * from user');

    // const user = this.userRepo.create(UserDto, {
    //   id: 1,
    //   name: 'xxx',
    //   age: 20,
    //   department_id: 20,
    //   refferId: 2
    // });
    // return user;

    // let user = new User();
    // let userData: any = {};
    // userData.name = 'xx';
    // userData.age = 20;
    // userData.department_id = 20;
    // userData.refferId = 2;
    // let user = this.userRepo.create(userData);
    // return this.userRepo.save(user);

    // const user = new User();
    // let merge = this.userRepo.merge(user, { name: 'yyy', age: 30, department_id: 30, refferId: 3 });
    // console.log(merge);
    // return this.userRepo.save(merge);

    // const userData = {
    //   name: 'yyy',
    //   age: 30,
    //   department_id: 30,
    //   refferId: 3
    // }
    // const user = this.userRepo.preload(userData);
    // console.log(user);
    // return user;


    data = {
      name: 'uu',
      age: 77,
      department_id: 40,
      names: ['alex', ',sasa'],
      profile: {
        name: 'John',
        nickname: 'kovich'
      }
      // refferId: 3
    }
    let data1: any = {
      name: 'k',
      age: 45,
      department_id: 55,
      names: ['alex', 'sasa']
      // refferId: 4
    }
    // let user = new User();
    let user = this.userRepo.create(data);
    let user1 = this.userRepo.create(data1);


    return await this.userRepo.save(user);
    // return await this.userRepo.save([data, data1]);

    // return await this.userRepo.insert(user);
    // return await this.userRepo.insert([data, data1]);

    // return await this.userRepo.remove([data, data1])
    // return await this.userRepo.delete({ name: 'xx' })

    // return await this.userRepo.count({ name: 'sdusdu' })

    // await this.userRepo.increment(data, 'sex', 1);
    // console.log(data);
    // return await this.userRepo.findByIds([1, 2, 3]);
  }

  // 添加一条日志
  async createLog() {
    let id = 4;

    // 先查询当前用户存在哪些logs，然后累加到user.logs中
    let currentUser = await this.userRepo.findOne(id, { relations: ['logs'] });
    // console.log(currentUser);

    let log = new Log();
    log.detail = '退款5';
    await this.logRepo.save(log);

    // console.log(log)

    let user = new User();
    user.id = id;
    user.logs = [...currentUser.logs, log];
    return await this.userRepo.save(user);

  }


}

