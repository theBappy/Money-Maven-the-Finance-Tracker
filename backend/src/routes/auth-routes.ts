import {Router} from 'express'
import { LoginController, RegisterController } from '../controllers/auth-controller'

const authRoutes = Router()

authRoutes.post('/register', RegisterController)
authRoutes.post('/login', LoginController)


export default authRoutes