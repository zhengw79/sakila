import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Film } from "./film.model";
import { Actor } from "./actor.model";

@Table({ tableName: 'film_actor', timestamps: false })
export class FilmActor extends Model {

	@ForeignKey(() => Film)
	@Column({ type: DataType.SMALLINT })
	actor_id: number;

	@ForeignKey(() => Actor)
	@Column({ type: DataType.SMALLINT })
	film_id: number;
}
