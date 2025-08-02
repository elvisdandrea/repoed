import { Injectable } from '@nestjs/common';
import { ReadFileDto } from './dto/read-file-dto';
import { decryptEs3, encryptEs3 } from './utils/encryption';
import { Response } from 'express';

const password = "Why would you want to cheat?... :o It's no fun. :') :'D";

@Injectable()
export class FileManagerService {

  readFile(readFileDto: ReadFileDto, file: Express.Multer.File) {
    const encryptedBuffer = file.buffer;
    const decryptedBuffer = decryptEs3(encryptedBuffer, password); 
    
    const finalBuffer = decryptedBuffer.toString('utf-8');
    const parsed = JSON.parse(finalBuffer);

    return parsed;
  } 

  async saveFile(res: Response, body: any) {
    const jsonString = JSON.stringify(body);
    const encryptedBytes = encryptEs3(Buffer.from(jsonString, 'utf-8'), password); 

    // Send as a downloadable file
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="encrypted.es3"',
    });
    res.send(Buffer.from(encryptedBytes));
  }
}
