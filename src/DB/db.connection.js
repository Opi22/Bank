import mongoose from "mongoose";
const dbConnect= async()=>{
    await mongoose.connect("mongodb://localhost:27017/Bank").then(()=>{
        console.log("db connected successfully")
    }).catch((err)=>{
        console.log(err);
    })
}
export default dbConnect;