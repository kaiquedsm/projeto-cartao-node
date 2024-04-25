import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/authUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCardController } from './controllers/card/CreateCardController';
import { ValidateCardController } from './controllers/card/ValidateCardController';

/* ÁREA DE IMPORTAÇÃO DOS CONTROLLERS */

const router = Router()

router.get('/teste', (req: Request, res: Response) => {
    return res.json({nome: 'Kaique'})
})
router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.post('/card', isAuthenticated, new CreateCardController().handle)
router.post('/validatecard', isAuthenticated, new ValidateCardController().handle)

export{router}