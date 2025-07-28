import { Injectable } from '@nestjs/common';
import { ReadFileDto } from './dto/read-file-dto';
import { decryptEs3, encryptEs3 } from './utils/encryption';
import { Response } from 'express';

const password = "Why would you want to cheat?... :o It's no fun. :') :'D";

@Injectable()
export class FileManagerService {

  readFile(readFileDto: ReadFileDto, fileBuffer: Buffer) {
    const encryptedBytes = new Uint8Array(fileBuffer);
    const result = decryptEs3(encryptedBytes, password);
    return result;
  } 

  async saveFile(res: Response, body: any) {
    const jsonString = JSON.stringify(body);
    const encryptedBytes = encryptEs3(jsonString, password); 

    // Send as a downloadable file
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="encrypted.es3"',
    });
    res.send(Buffer.from(encryptedBytes));
  }
}
