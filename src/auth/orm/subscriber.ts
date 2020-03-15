import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { validate } from "class-validator";
import { HttpException } from "@nestjs/common";


@EventSubscriber()
export class EverythingSubscribe implements EntitySubscriberInterface<any> {
  // 插入前校验
  // async beforeInsert(event: InsertEvent<any>) {
  //   const validateErrors = await validate(event.entity);
  //   if (validateErrors.length > 0) {
  //     throw new HttpException(getErrorMessage(validateErrors), 404);
  //   }
  // }

  // // 更新前校验
  // async beforeUpdate(event: UpdateEvent<any>) {
  //   const validateErrors = await validate(event.entity, {
  //     // 更新操作不会验证没有涉及的字段
  //     skipMissingProperties: true,
  //   });

  //   if (validateErrors.length > 0) {
  //     throw new HttpException(getErrorMessage(validateErrors), 404);
  //   }
  // }
}