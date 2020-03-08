import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// @Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private readonly schema) { }

//   transform(value: any, metadata: ArgumentMetadata) {
//     const { error } = this.schema.validate(value);
//     if (error) {
//       throw new BadRequestException('Validation failed');
//     }
//     return value;
//   }
// }

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) { // transform()函数是异步的，因为有些class-validator的验证是可以异步的
    console.log('value：', value)
    console.log('metatype：', metatype)
    console.log('判断：', !metatype || !this.toValidate(metatype))
    if (!metatype || !this.toValidate(metatype)) {
      return value; // 验证管道，要么返回值不变，要么抛出异常
    }
    const object = plainToClass(metatype, value); // 转换JavaScript的参数为可验证的类型对象。一个请求中的body数据是不包行类型信息的，Class-validator需要使用前面定义过的DTO，就需要做一个类型转换
    console.log('object: ', object)
    const errors = await validate(object);
    console.log('errors: ', errors)
    if (errors.length > 0) {
      throw new BadRequestException('Valildation failed');
    }
    return value;
  }

  // 当验证类型不是JavaScript的数据类型时，跳过验证
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    console.log('toValidate: ', types.includes(metatype))
    return !types.includes(metatype);
  }
}