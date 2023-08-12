import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Film } from './models/film.model';
import { FilmService } from './services/film.service';
import * as dotenv from "dotenv";
import { Actor } from './models/actor.model';
import { FilmActor } from './models/film.actor.model';
import { CacheModule } from '@nestjs/cache-manager';

dotenv.config({ path: ".env", override: true });

@Module({
	imports: [
		CacheModule.register(),
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			models: [Actor, Film, FilmActor]
		}),
		SequelizeModule.forFeature([Actor, Film, FilmActor])
	],
	providers: [FilmService],
	exports: [SequelizeModule, FilmService]
})
export class DBModule { }
