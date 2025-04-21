import mongoose from "mongoose"
const Schema = mongoose.Schema
const threadSchema = new Schema({
    thethread:{
        type:String,
        required:true,
        

    },
  
    myid:{
        type:String,
        required:true,
        

    },

   
   
},{timestamps:true})

export default mongoose.model("Thread",threadSchema)