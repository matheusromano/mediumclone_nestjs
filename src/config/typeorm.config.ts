import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "pguser",
    password: "pgpassword",
    database: "mediumclone",
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
};
