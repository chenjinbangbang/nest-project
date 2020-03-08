import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// 转换管道
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log('value: ', value)
    console.log('value type: ', typeof value)
    console.log('metadata: ', metadata)
    const val = parseInt(value, 10);
    console.log('val type success: ', typeof val)
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}