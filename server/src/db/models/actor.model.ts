import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Film } from "./film.model";
import { FilmActor } from "./film.actor.model";

@Table({ tableName: 'actor', timestamps: false })
export class Actor extends Model {

	@Column({ type: DataType.SMALLINT, primaryKey: true })
	actor_id: number;

	@Column({ type: DataType.STRING })
	first_name: string;

	@Column({ type: DataType.STRING })
	last_name: string;

	@Column({ type: DataType.TIME })
	last_update: string;

	@BelongsToMany(() => Film, () => FilmActor)
	films: Film[];
}
