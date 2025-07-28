import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileManagerModule } from './file-manager/file-manager.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FileManagerModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available app-wide
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
