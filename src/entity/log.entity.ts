import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

// 财务日志编号：id
// 用户编号：user_id
// 时间：time
// 类型：type（varchar，0：购买金币，1：金币兑换现金，2：发布任务，3：完成任务）（字典表）
// 详情：detail
// 金币变化：change_gold
// 金币变化类型：change_gold_type（0：减少，1：增加）
// 剩余金币：gold
// 现金变化类型：change_wealth_type（0：减少，1：增加）
// 现金变化：change_wealth
// 剩余现金：balance

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  // 多个日志对应一个用户
  @ManyToOne(type => User, user => user.logs)
  user: User

  @CreateDateColumn()
  time: Date;

  @Column({ default: 1 })
  type: number

  @Column()
  detail: string
}