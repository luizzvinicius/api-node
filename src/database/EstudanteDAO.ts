import { Request, Response } from "express"
import { Connection, QueryError } from "mysql2"

class EstudanteDAO {
    private conn: Connection

    constructor(conn: Connection) {
        this.conn = conn
    }
    
    public insert(req: Request, res: Response): void {
        const SQL = "insert into estudante (nome, nota) values (?, ?)"
        this.conn.query(SQL, [req.body.nome, req.body.nota], (error: QueryError | null, result: any) => {
            if (error || result.affectedRows == 0) {
                res.status(400).json({ message: "Erro ao cadastrar estudante" })
                return
            }
            res.status(201).json({ message: `${req.body.nome} cadastrado` })
        })
    }

    public select(req: Request, res: Response): void {
        let sql = req.params.id == undefined ? "SELECT * FROM estudante" : "SELECT * FROM estudante where id = ?"

        this.conn.query(sql, [req.params.id], (error: QueryError | null, result: any) => {
            if (error || result.length == 0) {
                res.status(404).json({ erro: "erro ao consultar estudantes", details: error })
                return
            }
            res.status(200).send(result)
        })
    }

    public update(req: Request, res: Response): void {
        let id = Number.parseInt(req.params.id)
        let nota = Number.parseFloat(req.body.nota)
        const SQL = "update estudante set nota = ? where id = ?"
        this.conn.query(SQL, [nota, id], (error: QueryError | null, result: any) => {
            if (error || result.affectedRows == 0) {
                res.status(400).json({ message: "Nenhuma linha afetada", erro: error })
                return
            }
            res.status(200).send(`Nota atualizada`)
        })
    }

    public delete(req: Request, res: Response): void {
        let id = Number.parseInt(req.params.id)
        const SQL = "delete from estudante where id = ?"
        this.conn.query(SQL, [id], (error: QueryError | null, result: any) => {
            if (error || result.affectedRows == 0) {
                res.status(400).json({ message: "Nenhuma linha afetada", erro: error })
                return
            }
            res.status(201).send(`Estudante excluído`)
        })
    }
}

export default EstudanteDAO