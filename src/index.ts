import App from "./app"
import ConnectionFactory from "./database/ConnectionFactory"

const PORT = 3000

let conectou = ConnectionFactory.connect()

if (conectou) {
    new App().server.listen(PORT)
}