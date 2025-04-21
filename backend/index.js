
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authrouter from './routes/userRoutes.js'
import contentrouter from './routes/contentRoutes.js'
import threadrouter from './routes/threadRoutes.js'






const app = express()

dotenv.config()
app.use(cookieParser())
app.use(cors(

    ({
        origin:'*',
        credentials:true
    })
))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())





//
app.use('/api/auth',authrouter)
app.use('/api/content',contentrouter)
app.use('/api/thread',threadrouter)





mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
})
.catch((error)=> {
    console.log(error)
})





