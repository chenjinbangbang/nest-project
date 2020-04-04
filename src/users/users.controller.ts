import { Controller, Get, Request, UseGuards, UseInterceptors, UploadedFile, Post, UploadedFiles, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiQuery, ApiHeader, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor, MulterModule } from '@nestjs/platform-express';

import fs = require('fs');
import crypto = require('crypto');

// MulterModule.register({ dest: '/uploads' })
// MulterModule.registerAsync({
//   useFactory: () => ({
//     dest: '/public'
//   })
// })

// 上传图片
import multer = require('multer');
// // const upload = multer({dest: 'public/uploads'})
const storage = multer.diskStorage({
  destination(req: any, file: any, cb: (arg0: any, arg1: string) => void) {
    cb(null, `uploads`);
  },
  filename(req: any, file: { originalname: any; }, cb: (arg0: any, arg1: string) => void) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
// const upload = multer({
//   storage
// })

// 文件上传的实体
class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary'
  })
  file: any;

  @ApiProperty({
    type: 'string'
  })
  name: string;
}

class FileUploadDtoMulti {
  @ApiProperty({
    // type: 'object',
    // properties: {
    //   name: {
    //     type: 'string'
    //   },
    //   fileName: {
    //     type: 'string',
    //     format: 'binary'
    //   }
    // }

    type: 'array',
    items: {
      type: 'string',
      format: 'binary'
    },
    // maxItems: 2

    // type: 'string',
    // format: 'binary'
  })
  files: any;
}

class FileUploadDtoMultiParams {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '头像'
  })
  avatar: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '背景图片'
  })
  background: any;
}

// @ApiHeader({
//   name: 'Authorization',
//   description: 'token'
// })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    // console.log(11)

    // 加密hash
    const secret = '123456';
    const hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');
    console.log(hash);
  }

  // 获取用户信息
  // @UseGuards(AuthGuard('jwt'))
  @Get('userinfo')
  @ApiQuery({ name: 'id', description: '用户编号' })
  userinfo(@Request() req) {
    return this.usersService.userinfo(req.id);
  }

  // 获取所有用户信息
  @Get('userList')
  userList() {
    return this.usersService.userList();
  }

  // 上传单个文件
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
    description: '上传单个文件'
  })
  uploadFile(@UploadedFile() file, @Body() body) {
    console.log(file);
    console.log(body);
    return '上传成功';
  }

  // 上传多个文件
  @Post('uploadMulti')
  @UseInterceptors(FilesInterceptor('files', 2, { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDtoMulti,
    description: '上传多个文件',

    // schema: {
    //   type: 'object',
    //   properties: {
    //     name: {
    //       type: 'string'
    //     },
    //     files: {
    //       type: 'array',
    //       items: {
    //         type: 'string',
    //         format: 'binary'
    //       }
    //     }
    //   }
    // },
    // description: '上传多个文件'
  })
  uploadFileMulti(@UploadedFiles() files) {
    console.log(files);
    return '上传成功';
  }

  // 上传多个文件 - 多个字段
  @Post('uploadMultiParams')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ], { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDtoMultiParams,
    description: '上传多个文件 - 多个字段',
  })
  uploadFileMultiParams(@UploadedFiles() files) {
    console.log(files);
    return '上传成功';
  }

  // 删除文件
  @Post('deleteFile')
  deleteFile() {
    // let err: any = fs.unlinkSync('uploads/1585925670268_小汽车增量指标确认通知书.pdf'); // 删除文件，不能删除目录
    // if (err) throw err;
    // console.log('删除成功');

    // let err: any = fs.rmdirSync('uploads/', { recursive: true }) // 删除目录，不能删除文件
    // if (err) throw err;
    // console.log('删除成功');

    // 移动文件（目标文件夹public必须存在，否则失败）
    fs.rename('uploads/1585925607280_1.png', 'public/1585925607280_1.png', (err) => {
      if (err) throw err;
      console.log('移动文件成功');
    });

  }
}


