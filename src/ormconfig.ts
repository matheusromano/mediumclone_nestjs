import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mediumclone",
    password: "admin",
    database: "mediumclone",

};

export default config;