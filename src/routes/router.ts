import { Router, Request, Response } from "express"
import ConnectionFactory from "../database/ConnectionFactory"
import EstudanteDAO from "../database/EstudanteDAO"

const router: Router = Router()

function buscaId<T>(dados: Array<T>, predicate: (elem: T) => boolean): Array<T> {
    let filtrado: Array<T> = []
    filtrado = dados.filter(dado => predicate(dado))
    return filtrado
}

router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await new EstudanteDAO(ConnectionFactory.getPool).select(req, res)
        if (result.length == 0) {
            throw "Nenhum estudante encontrado"
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error })
    }
})

router.post("/cadastro", async (req: Request, res: Response) => {
    try {
        const result = await new EstudanteDAO(ConnectionFactory.getPool).insert(req, res)
        if (result[0].affectedRows == 0) {
            throw "Nenhuma linha afetada"
        }
        res.status(201).json({message: `${req.body.nome} inserido`})
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

router.route("/estudantes/:id")
    .get(async (req: Request, res: Response) => {
        try {
            const result = await new EstudanteDAO(ConnectionFactory.getPool).select(req, res)
            if (result.length == 0) {
                throw "Nenhum estudante encontrado"
            }
            res.status(200).json(result)
        } catch (error) {
            res.status(404).json({ message: error })
        }
    })
    .put(async (req: Request, res: Response) => {
        try {
            const result = await new EstudanteDAO(ConnectionFactory.getPool).update(req, res)
            if (result[0].affectedRows == 0) {
                throw "Nenhuma linha afetada"
            }
            res.status(200).json({ message: "Nota atualizada" })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    })
    .delete(async (req: Request, res: Response) => {
        try {
            const result = await new EstudanteDAO(ConnectionFactory.getPool).delete(req, res)
            if (result[0].affectedRows == 0) {
                throw "Nenhuma linha afetada"
            }
            res.status(200).json({ message: "Estudante excluído" })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    })

export default router