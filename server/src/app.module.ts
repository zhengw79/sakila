import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { CacheModule } from '@nestjs/cache-manager';
import { FilmController } from './film.controller';

@Module({
  imports: [CacheModule.register(), DBModule],
  controllers: [AppController, FilmController],
  providers: [AppService],
})
export class AppModule {}
