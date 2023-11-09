import { Router, Request, Response } from "express"
import ConnectionFactory from "../database/ConnectionFactory"
import EstudanteDAO from "../database/EstudanteDAO"

const router: Router = Router()

function buscaId<T>(dados: Array<T>, predicate: (elem: T) => boolean): Array<T> {
    let filtrado: Array<T> = []
    filtrado = dados.filter(dado => predicate(dado))
    return filtrado
}

router.get("/", (req: Request, res: Response) => {
    new EstudanteDAO(ConnectionFactory.getConn).select(req, res)
})

router.post("/cadastro", (req: Request, res: Response) => {
    new EstudanteDAO(ConnectionFactory.getConn).insert(req, res)
})

router.route("/estudantes/:id")
    .get((req: Request, res: Response) => {
        new EstudanteDAO(ConnectionFactory.getConn).select(req, res)
    })
    .put((req: Request, res: Response) => {
        new EstudanteDAO(ConnectionFactory.getConn).update(req, res)
    })
    .delete((req: Request, res: Response) => {
        new EstudanteDAO(ConnectionFactory.getConn).delete(req, res)
    })

export default router