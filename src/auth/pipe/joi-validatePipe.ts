import { Injectable, ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Object) { }

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value)
    // console.log(metadata)
    // const { error } = this.schema.validate(value);
    // if (error) {
    //   throw new BadRequestException(JSON.stringify(error.details));
    // }
    return value;
  }
}