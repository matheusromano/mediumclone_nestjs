import { ConfigService } from "@nestjs/config/dist";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

type TypeOrmConfig = (...args: any[]) => TypeOrmModuleOptions;

export const typeOrmConfig: TypeOrmConfig = (configService: ConfigService) => {
    return {
    type: "postgres",
    host: configService.get("MC_API_DATABASE_HOST"),
    port: +configService.get('MC_API_DATABASE_PORT'),
    username: configService.get("MC_API_DATABASE_USER"),
    password: configService.get("MC_API_DATABASE_PASSWORD"),
    database: configService.get("MC_API_DATABASE_NAME"),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    migrationsRun: true,
    };
};
