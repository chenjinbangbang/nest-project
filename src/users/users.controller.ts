import { Controller, Get, Request, UseGuards, UseInterceptors, UploadedFile, Post, UploadedFiles, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiQuery, ApiHeader, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor, MulterModule } from '@nestjs/platform-express';

// MulterModule.register({ dest: '/public' })
// MulterModule.registerAsync({
//   useFactory: () => ({
//     dest: '/public'
//   })
// })

// 上传图片
// import multer from 'multer';
// // const iconv = require('iconv-lite'); // 解决上传文件名中文乱码问题（暂时无法解决）
// // const fs = require('fs')
// const imgSrc = 'uploads_backup'; // 文件路径，在public文件夹下
// // const upload = multer({dest: 'public/uploads'})
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, `public/${imgSrc}`);
//   },
//   filename(req, file, cb) {
//     console.log(file);

//     // let fileStr = fs.readFileSync(`public/${imgSrc}`, { encoding: 'binary' });
//     // let buf = new Buffer(fileStr, 'binary');
//     // let str = iconv.decode(buf, 'utf8');
//     // console.log(str);

//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });
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
  constructor(private readonly usersService: UsersService) { }

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
  @UseInterceptors(FileInterceptor('file', {
    storage: {
      destination: (req, file, cb) => {
        cb(null, `public/`);
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
      }
    }
  }))
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
  @UseInterceptors(FilesInterceptor('files', 2))
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
  ]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDtoMultiParams,
    description: '上传多个文件 - 多个字段',
  })
  uploadFileMultiParams(@UploadedFiles() files) {
    console.log(files);
    return '上传成功';
  }
}


