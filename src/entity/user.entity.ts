import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from 'typeorm';
import { Photo } from './photo.entity';
import { Log } from './log.entity';

enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost'
}
type UserRoleType = 'admin' | 'editor' | 'ghost';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ select: false }) // select为false：隐藏列，使用find或查询，是不会受到这个模型的属性，只有在select('department_id')或select('*')才会收到
  department_id: number;

  @Column({ nullable: true })
  refferId: number;

  // 一个用户有多张图片
  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

  // 一个用户有多个日志
  @OneToMany(type => Log, log => log.user)
  logs: Log[];

  // @Column()
  profilePhoto: Photo; // 映射

  // enum列类型
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: UserRole

  // 使用带有枚举值的数组
  @Column({
    type: 'enum',
    enum: ['admin', 'editor', 'ghost'],
    default: 'ghost'
  })
  roleType: UserRoleType;

  // set列类型
  @Column({
    type: 'set',
    enum: UserRole,
    default: [UserRole.GHOST, UserRole.EDITOR]
  })
  roles: UserRole[];

  @Column({
    type: 'set',
    enum: ['admin', 'editor', 'ghost'],
    default: ['ghost', 'editor']
  })
  rolesType: UserRoleType[]

  // simple-array列类型
  @Column('simple-array')
  names: string[];

  // simple-json列类型
  @Column('simple-json')
  profile: { name: string, nickname: string };

  // @Generated
  @Column()
  @Generated('uuid')
  uuid: string;

}