import { DataSource } from "typeorm"
import { User } from "./src/entities/User"

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: './src/database/db.sqlite',
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async () => {

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))