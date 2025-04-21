import Content from '../Model/contentModel.js'


export const ContentController= async(req,res,next)=>{
    
    try {
     const newContent = new Content({
        content:req.body.content
     })
     await newContent.save()
     res.status(200).json(newContent)

        
    } catch (error) {
        res.status(500).json({error:"could not post new content"})
    }

}

export const getallContents = async(req,res,next) => {
    try{
        const mycontent = await Content.find({}).sort({createdAt: - 1})
        res.status(200).json(mycontent)
    }catch(error){
        res.status(500).json({error:'content not found'})
    }

}

export const getContentControl = async(req,res) => {

    try {


        const {id} = req.params
     
      
   if(!id){
    return res.status(400).json({error:'id not found'})
   }
       const content = await Content.findById(id)
       if(!content){
        return res.status(404).json({message:'content not found'})
       }
       res.status(200).json(content)
      
       } catch (error) {
           res.status(500).json({error:"internal server error"})
   }
}   



