import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors())

app.use(router)

// MIDDLEWARE PARA TRATAMENTO DE ERROS DE ROTAS
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) { 
        // se e o valor recebido for uma instância do tipo erro
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(200).json({
        status: 'error',
        message: 'Internal Server Error.'
    })
})

app.listen(3000, () => {
    console.log('Executando...');
    
})