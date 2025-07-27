import { Injectable } from '@nestjs/common';
import { CreateFileManagerDto } from './dto/create-file-manager.dto';
import { UpdateFileManagerDto } from './dto/update-file-manager.dto';
import { ReadFileDto } from './dto/read-file-dto';
import { decryptEs3 } from './utils/encryption';

const password = "Why would you want to cheat?... :o It's no fun. :') :'D";

@Injectable()
export class FileManagerService {

  readFile(readFileDto: ReadFileDto, fileBuffer: Buffer) {
    

    const encryptedBytes = new Uint8Array(fileBuffer);
    const result = decryptEs3(encryptedBytes, password);
    return result;
  } 


  create(createFileManagerDto: CreateFileManagerDto) {
    return 'This action adds a new fileManager';
  }

  findAll() {
    return `This action returns all fileManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileManager`;
  }

  update(id: number, updateFileManagerDto: UpdateFileManagerDto) {
    return `This action updates a #${id} fileManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileManager`;
  }
}
