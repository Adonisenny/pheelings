import user from '../Model/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ErrorHandler } from '../utils/errorHandler.js'


export const Register = async (req,res,next)=>{
    

    try {
        const existingUser = await user.findOne({email:req.body.email})
    if(existingUser){
                return res.status(400).json({message:'user already exist'})
            
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new user({
            email:req.body.email,
            username:req.body.username,
            password:hash
        })
        await newUser.save()
        res.status(200).json({message:'user has been created'})
    } catch (error) {
        next(error)
    }



}
export const login = async(req,res,next)=> {
    try {
        
    
        const User = await user.findOne({username:req.body.username})
        if(!User) return next (ErrorHandler(404, 'user does not exist'))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, User.password)
        if(!isPasswordCorrect) return next(ErrorHandler(400, 'username or password not correct'))
        const token =jwt.sign({id:User._id}, process.env.thestash)
        const {password, ...otherdetails} =User._doc
        res.cookie('access_token', token,{
            httpOnly:true,

        }).status(200).json(otherdetails)
    }catch(error){
        next(error)
    }
}

export const logout = async (req,res,next)=> {
    try{
        res.clearCookie('access_token',{
          sameSite:'none',
          secure:true  
        }).status(200).json('you have been logged out')
    }catch(err){
        res.status(500).json({error:"logout unsuccessful"})
    }
}
