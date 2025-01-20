import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { products } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

export class productDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  attributes: any;
}

export class FileUploadDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
}

export class FilesUploadDTO {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  hinhAnh: any;
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(
    FileInterceptor('hinhAnh', {
      storage: diskStorage({
        destination: process.cwd() + '/public/imgs',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDTO,
  })
  @Post('/upload')
  upload(@UploadedFile() file: FileUploadDTO) {
    return file;
  }

  @UseInterceptors(
    FilesInterceptor('hinhAnh', 5, {
      storage: diskStorage({
        destination: process.cwd() + '/public/imgs',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FilesUploadDTO,
  })
  @Post('/uploadMultile')
  uploadMultiple(@UploadedFiles() files: FilesUploadDTO) {
    return files;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post('/createProduct')
  create(@Body() createProductDto: productDTO) {
    return this.productService.create(createProductDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: products) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
