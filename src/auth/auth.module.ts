import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    // PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // 确定默认策略行为
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
