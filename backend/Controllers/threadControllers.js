
import Thread from "../Model/threadModel.js"




export const ThreadController = async(req,res) => {
try {
   const newthread = new Thread({
    thethread:req.body.thethread,
    myid:req.body.myid

   })
   await newthread.save()
   res.status(200).json(newthread)
} catch (error) {
    console.log(error)
}
}
export const getThreadController = async(req,res) => {
    try{
        const myid = req.params.myid
        
        const thread = await Thread.find({myid:myid})
        if(!thread){
            return res.status(404).json({message:'thread not found'})
            
        }
        res.status(200).json(thread)
    }catch(error){
        res.status(500).json({error:'not found'})
    }
}