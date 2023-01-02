import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "pgsql",
    port: 5432,
    username: "mediumclone",
    password: "admin",
    database: "mediumclone",

};

export default config;