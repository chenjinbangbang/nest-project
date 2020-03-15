import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Auth } from './auth.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({
    comment: '主键'
  })
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Auth, auth => auth.comments) // 多个Comment对应一个User
  @JoinColumn()
  auth: Auth;
}