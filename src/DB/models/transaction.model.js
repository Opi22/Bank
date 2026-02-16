import mongoose from "mongoose"
const transactionSchema = new mongoose.Schema({
    sender:{
        type:String,
        ref:"Account",
        required:true
    }, amount:{
        type:Number,
        required:true,
    }, reciever:{
        type:String,
        ref:"Account",
        required:true
    }, iniTime:{
        type: String,
        default: Date.now
    }
})
const transactionModel= mongoose.models.Transactions||mongoose.model("Transactions", transactionSchema)
export default transactionModel;