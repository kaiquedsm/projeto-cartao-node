import {Request, response, Response} from 'express'
import { CreateCardService } from '../../services/card/CreateCardService'
import { ValidateCardService } from '../../services/card/ValidateCardService'

class ValidateCardController {
    async handle(req: Request, res: Response) {
        const {numero, seguranca} = req.body
        const usuario = req.user_id
        
        const validateCardService = new ValidateCardService()
        const card = await validateCardService.execute({numero, seguranca, usuario})

        return res.json({card})
        
    }

}

export {ValidateCardController}