import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors';
import {router} from './routes';
import cors from 'cors'

const app = express();

app.use(express.json())//informando que o retorno sera um json
app.use(router)
app.use(cors())//liberando acesso para qualquer ip


//tratando errors
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
        //se instanciar algum erro
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3333, () => {console.log("Servidor Online!")})