import { Controller, Post, Body, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { ReadFileDto } from './dto/read-file-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { decryptEs3 } from './utils/encryption';
import { gunzipSync } from 'zlib';

const password = "Why would you want to cheat?... :o It's no fun. :') :'D";

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
      const encryptedBuffer = file.buffer;

      const decryptedBuffer = decryptEs3(encryptedBuffer, password); // your decrypt function

      // let finalBuffer = decryptedBuffer;
      // if (finalBuffer.slice(0, 2).toString('hex') === '1f8b') {
      //   finalBuffer = gunzipSync(finalBuffer);
      // }

      const finalBuffer = decryptedBuffer.toString('utf-8');
      const parsed = JSON.parse(finalBuffer);

      res.setHeader('Content-Type', 'application/json');
      res.send(parsed);

      // Option 2: Force file download
      /*
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="decrypted.json"');
      res.send(finalBuffer);
      */

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
