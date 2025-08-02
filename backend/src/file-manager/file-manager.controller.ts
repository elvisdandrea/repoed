import { Controller, Post, Body, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { ReadFileDto } from './dto/read-file-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('file-manager')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService) {}


  @Post('readfile')
  @UseInterceptors(FileInterceptor('file'))
  readFile(
    @Body() readFileDto: ReadFileDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {

     try {
      const fileContent = this.fileManagerService.readFile(readFileDto, file);

      res.setHeader('Content-Type', 'application/json');
      res.send(fileContent);
    } catch (err) {
      console.error('Decryption failed:', err);
      res.status(500).send('Decryption failed');
    }
  
  }

  @Post('saveFile')
  async saveFile(
    @Res() res: Response,
    @Body() body: any
  ) {
    return await this.fileManagerService.saveFile(res, body);
  }
}
