import { DataType, Column, Model, Table, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { FilmActor } from './film.actor.model';
import { Actor } from './actor.model';

export enum RateType {
	G = 'G',
	PG = 'PG',
	PG13 = 'PG-13',
	R = 'R',
	NC17 = 'NC-17'
}

@Table({ tableName: 'film', timestamps: false })
export class Film extends Model {

	@Column({ type: DataType.SMALLINT, primaryKey: true })
	film_id: number;

	@Column(DataType.STRING)
	title: string;

	@Column(DataType.TEXT)
	description: string;

	@Column(DataType.STRING)
	release_year: string;

	@Column(DataType.SMALLINT)
	language_id: number;

	@Column(DataType.SMALLINT)
	original_language_id: number;

	@Column(DataType.SMALLINT)
	rental_duration: number;

	@Column(DataType.DECIMAL(4, 2))
	rental_rate: number;

	@Column(DataType.SMALLINT)
	length: number;

	@Column(DataType.DECIMAL(4, 2))
	replacement_cost: number;

	@Column(DataType.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'))
	rating: RateType

	@Column(DataType.STRING)
	special_features: string

	@UpdatedAt
	last_upadte: string;

	@BelongsToMany(() => Actor, () => FilmActor)
	actors: Actor[];

	
}
