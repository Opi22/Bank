import mongoose from "mongoose"
const accountSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    }
    , email:{
        type:String,
        required:true,
        unique:true
    }, IBAN:{
        type:String, 
        required:true, 
        unique:true
    }, balance:{
        type:Number,
        required:true
    }
})
const accountModel= mongoose.models.Account|| mongoose.model("Account", accountSchema);
export default accountModel;
