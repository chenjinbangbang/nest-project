import { createParamDecorator } from '@nestjs/common';

// 为了使其更具可读性和透明性，可以创建@User()装饰器并且在所有控制器中重复利用它
export const User = createParamDecorator((data: string, req) => {
  console.log('decorator data: ', data);
  // console.log('decorator user: ', req.query);
  // console.log('decorator body: ', req.body);
  return data ? req.user && req.user[data] : req.user;
})