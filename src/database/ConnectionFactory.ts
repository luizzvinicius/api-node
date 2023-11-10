import { createConnection, Connection, QueryError } from "mysql2"

class ConnectionFactory {
    private conn: Connection

    constructor() {
        this.conn = createConnection({
            database: "node",
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root",
        })
    }

    public connect(): boolean {
        this.conn.connect((error: QueryError | null) => {
            if (error) {
                console.log(error, "Erro ao criar conexão")
                return false
            }
            console.log("Conectado ao banco de dados!")
        })
        return true
    }

    get getConn(): Connection {
        return this.conn
    }
}

export default new ConnectionFactory()