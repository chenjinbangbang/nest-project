import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  // @Column()
  profilePhoto: Photo; // 映射

}