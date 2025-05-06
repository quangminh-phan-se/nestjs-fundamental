import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Ingredient, Recipe } from 'src/recipe/entity/recipe';

dotenv.config();

export class ConfigDatabase {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value as string;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DATABASE_HOST'),
      port: parseInt(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USER'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),
      entities: [Recipe, Ingredient],
      synchronize: false,
      logging: true,
    };
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));

    return this;
  }
}

export const configDatabase = new ConfigDatabase(process.env).ensureValues([
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
]);
