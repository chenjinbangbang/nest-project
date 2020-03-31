import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entity/user.entity';
import { Photo } from 'src/entity/photo.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    // UserModule,
    TypeOrmModule.forFeature([User, Photo])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
