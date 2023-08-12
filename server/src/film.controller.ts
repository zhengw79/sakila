import { Controller, Get, Param } from '@nestjs/common';
import { FilmService } from 'src/db/services/film.service';
import { Film } from 'src/db/models/film.model';

@Controller('film')
export class FilmController {

	constructor(
		private filmService: FilmService
	) {}

	@Get(':id')
	findFilmById(@Param() param: any): Promise<Film> {
		const film_id = param.id;
		return this.filmService.retrieve_film(film_id);
	}
}
