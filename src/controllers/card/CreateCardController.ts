import {Request, response, Response} from 'express'
import { CreateCardService } from '../../services/card/CreateCardService'

class CreateCardController {

    async handle(req: Request, res: Response) {
        const {numero, proprietario, validade, seguranca} = req.body
        const usuario = req.user_id
        
        const createCardService = new CreateCardService()
        const card = await createCardService.execute({numero, proprietario, validade, seguranca, usuario})

        return res.json({card})
        
    }

}

export {CreateCardController}