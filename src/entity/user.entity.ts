import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 一个用户有多张图片
  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

  // @Column()
  profilePhoto: Photo;
}