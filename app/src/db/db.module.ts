import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host:
		})
	]
})
export class DbModule {}
