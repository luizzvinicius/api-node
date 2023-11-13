import { Request, Response } from "express"
import { Pool } from "mysql2/promise"

class EstudanteDAO {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    public async insert(req: Request, res: Response): Promise<any> {
        const SQL = "insert into estudante (nome, nota) values (?, ?)"
        let { nome, nota } = req.body
        let result: any
        try {
            const conn = await this.pool.getConnection()
            result = await conn.query(SQL, [nome, nota])
        } catch (error) {
            res.status(400).json({ errorDAO: error })
        }
        return result
    }

    public async select(req: Request, res: Response): Promise<[]> {
        const SQL = req.params.id == undefined ? "SELECT * FROM estudante" : "SELECT * FROM estudante where id = ?"
        let result: any
        try {
            const conn = await this.pool.getConnection()
            result = await conn.query(SQL, [req.params.id])
        } catch (error) {
            res.status(404).json({ erroDAO: error })
        }
        return result[0]
    }

    public async update(req: Request, res: Response): Promise<any> {
        const SQL = "update estudante set nota = ? where id = ?"
        let result: any
        try {
            const conn = await this.pool.getConnection()
            result = await conn.query(SQL, [req.body.nota, req.params.id])
        } catch (error) {
            res.status(400).json({ erroDAO: error })
        }
        return result
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const SQL = "delete from estudante where id = ?"
        let result: any
        try {
            const conn = await this.pool.getConnection()
            result = await conn.query(SQL, [req.params.id])
        } catch (error) {
            res.status(404).json({ erroDAO: error })
        }
        return result
    }
}

export default EstudanteDAO