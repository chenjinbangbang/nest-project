import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Xx {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  // 多张图片对应一个用户
  @ManyToOne(type => User, user => user.xxs)
  user: User;
}