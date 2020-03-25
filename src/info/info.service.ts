import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from 'src/entity/info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(@InjectRepository(Info) private readonly infoRepo: Repository<Info>) { }

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
    // return this.infoRepo.createQueryBuilder()
    //   .select('info')
    //   .from(Info, 'info')
    //   .where('info.id = :id', data)
    //   // .getOne();
    //   .getMany();

    // 使用实体管理器（有问题）
    // return this.infoRepo.createQueryBuilder(Info, 'info')
    //   .where('info.id = :id', data)
    //   .getOne();

    // 使用存储库
    // return this.infoRepo.createQueryBuilder('info')
    //   .select(['info.id', 'info.username'])
    //   .where('id = :id', data)
    //   .getMany();
    // .getOne();

    // 执行select查询（有问题）
    // return this.infoRepo.createQueryBuilder()
    //   .select('info.id')
    //   .from(Info, 'info')
    //   .where('info.id = :id', data)
    //   .getOne();

    // 执行insert查询
    // return this.infoRepo.createQueryBuilder()
    //   .insert()
    //   .into(Info)
    //   .values({ name: '陈陈', age: 100, sex: 1, username: '陈先生' })
    //   .execute();

    // 执行update查询
    // return this.infoRepo.createQueryBuilder()
    //   // .update(Info)
    //   .update('info')
    //   .set({ age: 30 })
    //   .where('id = :id', data)
    //   .execute()

    // 执行delete查询
    // return this.infoRepo.createQueryBuilder()
    //   .delete()
    //   .from(Info)
    //   .where('id = :id', data)
    //   .execute();

    // 获取原始数据
    // return this.infoRepo.createQueryBuilder('info')
    //   .select('sum(info.sex)', 'sum')
    //   // .where('info.id = :id', data)
    //   .getRawOne();
    return this.infoRepo.createQueryBuilder('info')
      .select('info.id')
      .addSelect('sum(info.age)', 'sum')
      .getRawMany();

    // return this.infoRepo.find(data); // find()方法查询所有数据
    // return this.infoRepo.findAndCount(); // find()方法查询所有数据和总数
  }

  // 按条件查询数据
  find(name: string) {
    // return this.infoRepo.find({ name }) // find()方法加上查询对象参数，即可查询符合条件的数据

    // query查询
    return this.infoRepo.createQueryBuilder('a') // info为表名
      // .leftJoinAndSelect('info.roles', 'r') // 指定join info的roles关联属性，并指定别名为r，并设定搜寻条件
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
  async getInfoById(id) {
    console.log('根据某个字段查询数据', id);
    return await this.infoRepo.findOne(id); // 以id搜寻，没找到return null
    // return await this.infoRepo.findOneOrFail(id); // 以id搜寻，没找到会丢出例外
    // return await this.infoRepo.findOne({ id, firstName: 'jin' });
  }

  // 检查是否存在某个数据
  // async findOne(id) {
  //   let result = await this.infoRepo.findOne(id);
  //   if (result) {
  //     return result;
  //   } else {
  //     return { success: false, msg: '未找到该条数据', data: null };
  //   }
  // }

  // 新增数据
  async create(data) {
    const infoData = new Info;
    infoData.name = data.name;
    infoData.age = data.age;
    infoData.sex = data.sex;
    await this.infoRepo.save(infoData);
    return { success: true, msg: '新增数据成功', data: null };
  }

  // 更新数据
  async update(data) {

    // 检查是否存在该数据
    let result = await this.infoRepo.findOne(data.id);
    await this.infoRepo.save(data);
    // await this.infoRepo.update(data.id, data); // 用data里的值更新到资料库
    return { success: true, msg: '更新数据成功', data: null };
  }

  // 删除数据
  async delete(id) {


    await this.infoRepo.delete(id); // delete之需要传入id
    return '删除数据成功'
  }
}
