import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Photo } from 'src/entity/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo])],
  controllers: [UserController],
  providers: [UserService],
  // exports: [UserService]
})
export class UserModule { }
