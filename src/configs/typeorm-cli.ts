import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Ingredient, Recipe } from 'src/recipe/entity/recipe';
import { InitialSchema1746540293423 } from 'src/migrations/1746540293423-initial-schema';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Recipe, Ingredient],
  migrations: [InitialSchema1746540293423],
});
