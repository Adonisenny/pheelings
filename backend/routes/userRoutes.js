import express, { Router } from 'express'
import { login, logout, Register } from '../Controllers/authControllers.js'


const router = express.Router()

router.post('/register',Register)
router.post('/login',login)
router.post('/logout',logout)


export default router
