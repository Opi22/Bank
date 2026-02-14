import mongoose from "mongoose";
const dbConnect= async()=>{
    await mongoose.connect(uri).then(()=>{
        console.log("db connected successfully")
    }).catch((err)=>{
        console.log(err);
    })
}
export default dbConnect;