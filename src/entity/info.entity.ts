// 存储库模式：TypeORM支持存储库设计模式，因此每个实体都有自己的存储库。可以从数据库连接获得这些存储库。（会自动影响到mysql数据库的数据，所以不用手动操作mysql数据库）
import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Info extends BaseEntity { // 实体类要与字段数据库表一一对应，如数据库表名称为info（一定要用info，不能使用infoEntity，否则不生效）
  @PrimaryGeneratedColumn() // 主键装饰器
  id: number;

  @Column({ type: 'varchar', name: 'name', unique: true }) // @Column为对应的数据库列：type数据类型：与数据库字段类型对应。name名称：与数据库字段名称对应。length长度，default默认值：如果没有值(null)时，有批量设置初始默认值的功能
  name: string; // 返回值类型与返回值名称，在项目中就是用的这个名称

  @Column({ type: 'int' }) // 如果没有指定column的类型，则number对应int，string：varchar
  age: number;

  // @Column({
  //   default: false
  // })
  // sex: boolean; // boolean对应数据库的类型tinyint，false对应0，true对应1
  @Column({
    default: 0
  })
  sex: number;

  @Column('varchar')
  username: string;

  // 多个日志对应一个用户
  @ManyToOne(type => User, user => user.logs)
  user: User;

}