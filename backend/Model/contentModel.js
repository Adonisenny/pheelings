import mongoose from "mongoose";
const schema = mongoose.Schema

const contentSchema = new schema({
content:{
    type:String,
    required:true,
}
}, {timestamps:true})


export default mongoose.model("Content", contentSchema)