import { Pool, createPool, PoolOptions } from "mysql2/promise"

class ConnectionFactory {
    private pool: Pool

    constructor() {
        const poolConfig: PoolOptions = {
            database: "node",
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root",
            connectionLimit: 10
        }
        this.pool = createPool(poolConfig)
    }

    get getPool(): Pool {
        return this.pool
    }
}

export default new ConnectionFactory()