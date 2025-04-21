import express from 'express'
import { ThreadController,getThreadController } from '../Controllers/threadControllers.js'



const router = express.Router()

router.post('/', ThreadController)
router.get('/:myid', getThreadController)


export default router;