import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from '@hapi/joi';

@Injectable()
export class UserPipe implements PipeTransform {
  private schema;
  constructor(schema) {
    this.schema = schema;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);

    const { error } = this.schema.validate(value);
    console.log(error);
    if (error) {
      return error.details[0].message;
    }

    return value;
  }
}
