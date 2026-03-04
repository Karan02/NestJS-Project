import "reflect-metadata";
import { DataSource } from "typeorm";

const env = process.env.NODE_ENV || "development";

let dbConfig: any = {
  synchronize: false,
  migrations: ["migrations/*.js"],
};

if (env === "development") {
  dbConfig = {
    ...dbConfig,
    type: "sqlite",
    database: "db.sqlite",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
  };
}

if (env === "test") {
  dbConfig = {
    ...dbConfig,
    type: "sqlite",
    database: "test.sqlite",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    migrationsRun:true
  };

}

  if(env === 'production'){
      dbConfig = {
    ...dbConfig,
    type: "postgres",
    database: process.env.DATABASE_URL,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    migrationsRun:true,
    ssl:{
      rejectUnauthorized: false
    }
  };
  }
export const AppDataSource = new DataSource(dbConfig);