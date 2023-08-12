import { Inject, Injectable } from '@nestjs/common';
import { IFilm } from 'src/db/interfaces/film.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Film } from 'src/db/models/film.model';
import { Actor } from 'src/db/models/actor.model';
import { Observable, first, from, map, of, tap } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FilmService {
	private readonly films: IFilm[];

	constructor(
		@InjectModel(Film) private film: typeof Film,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) { }

	async retrieve_films(): Promise<Film[]> {
		return this.film.findAll();
	}

	async retrieve_film(id: number): Promise<Film> {
		const film_cached = await this.cacheManager.get('film');
		if (film_cached != null) {
			return film_cached as Film;
		} else {
			const film = await this.film.findOne({ where: { film_id: id }});
			this.cacheManager.set('film', film);
			return film;
		}
	}

	async retrieve_filmactors(id: number): Promise<Film> {
		return this.film.findByPk(id, { include: Actor });
	}
}
