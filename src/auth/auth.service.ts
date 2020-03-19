import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entity/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly authRepo: Repository<Auth>) { }

  // 验证用户名是否存在
  async checkUsername(param) {
    // let sql = `select * from user where username = '${param}'`;
    // let data = await db(sql);

    return param
  }

  // 查询所有数据
  findAll(data) {
    console.log(data)

    // 使用连接（有问题）
    // return this.authRepo.createQueryBuilder()
    //   .select('auth')
    //   .from(Auth, 'auth')
    //   .where('auth.id = :id', data)
    //   // .getOne();
    //   .getMany();

    // 使用实体管理器（有问题）
    // return this.authRepo.createQueryBuilder(Auth, 'auth')
    //   .where('auth.id = :id', data)
    //   .getOne();

    // 使用存储库
    // return this.authRepo.createQueryBuilder('auth')
    //   .select(['auth.id', 'auth.username'])
    //   .where('id = :id', data)
    //   .getMany();
    // .getOne();

    // 执行select查询（有问题）
    // return this.authRepo.createQueryBuilder()
    //   .select('auth.id')
    //   .from(Auth, 'auth')
    //   .where('auth.id = :id', data)
    //   .getOne();

    // 执行insert查询
    // return this.authRepo.createQueryBuilder()
    //   .insert()
    //   .into(Auth)
    //   .values({ name: '陈陈', age: 100, sex: 1, username: '陈先生' })
    //   .execute();

    // 执行update查询
    // return this.authRepo.createQueryBuilder()
    //   // .update(Auth)
    //   .update('auth')
    //   .set({ age: 30 })
    //   .where('id = :id', data)
    //   .execute()

    // 执行delete查询
    // return this.authRepo.createQueryBuilder()
    //   .delete()
    //   .from(Auth)
    //   .where('id = :id', data)
    //   .execute();

    // 获取原始数据
    // return this.authRepo.createQueryBuilder('auth')
    //   .select('sum(auth.sex)', 'sum')
    //   // .where('auth.id = :id', data)
    //   .getRawOne();
    return this.authRepo.createQueryBuilder('auth')
      .select('auth.id')
      .addSelect('sum(auth.age)', 'sum')
      .getRawMany();

    // return this.authRepo.find(data); // find()方法查询所有数据
    // return this.authRepo.findAndCount(); // find()方法查询所有数据和总数
  }

  // 按条件查询数据
  find(name: string) {
    // return this.authRepo.find({ name }) // find()方法加上查询对象参数，即可查询符合条件的数据

    // query查询
    return this.authRepo.createQueryBuilder('a') // auth为表名
      // .leftJoinAndSelect('auth.roles', 'r') // 指定join auth的roles关联属性，并指定别名为r，并设定搜寻条件
      .where('name like :name', { name: `%${name}%` }) // where条件。使用这种写法可防止SQL注入
      // .andWhere('')
      .orderBy('age', 'DESC') // DESC降序排序，ASC升序
      // .addOrderBy('age', 'DESC')
      .skip(0) // 分页-从哪行数据开始
      .take(2) // 分页-一页的条数
      .getManyAndCount(); // 回传record并count数量
    // .getMany(); // 回传多笔资料
    // .getSql() // 回传上面API所组出的Raw SQL，debug用（这个不存在）
  }

  // 根据某个字段查询数据
  async getAuthById(id) {
    console.log('根据某个字段查询数据', id);
    return await this.authRepo.findOne(id); // 以id搜寻，没找到return null
    // return await this.authRepo.findOneOrFail(id); // 以id搜寻，没找到会丢出例外
    // return await this.authRepo.findOne({ id, firstName: 'jin' });
  }

  // 检查是否存在某个数据
  // async findOne(id) {
  //   let result = await this.authRepo.findOne(id);
  //   if (result) {
  //     return result;
  //   } else {
  //     return { success: false, msg: '未找到该条数据', data: null };
  //   }
  // }

  // 新增数据
  async create(data) {
    const authData = new Auth;
    authData.name = data.name;
    authData.age = data.age;
    authData.sex = data.sex;
    await this.authRepo.save(authData);
    return { success: true, msg: '新增数据成功', data: null };
  }

  // 更新数据
  async update(data) {

    // 检查是否存在该数据
    let result = await this.authRepo.findOne(data.id);
    await this.authRepo.save(data);
    // await this.authRepo.update(data.id, data); // 用data里的值更新到资料库
    return { success: true, msg: '更新数据成功', data: null };
  }

  // 删除数据
  async delete(id) {


    await this.authRepo.delete(id); // delete之需要传入id
    return '删除数据成功'
  }
}
