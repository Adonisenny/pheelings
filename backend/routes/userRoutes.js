import express, { Router } from 'express'
import { login,Register } from '../Controllers/authControllers.js'


const router = express.Router()

router.post('/register',Register)
router.post('/login',login)



export default router
