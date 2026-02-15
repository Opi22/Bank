import jwt from "jsonwebtoken"
import accountModel from "../DB/models/account.model.js"
const authentication=async(req, res, next)=>{
    try{
        const {authorization}=req.headers
         if(!authorization){
            return res.status(400).json({message:"token required"})
        }
        const verified=jwt.verify(authorization,"1234")
        if(!verified){
            return res.status(400).json({message:"Invalid token"})
        }
        const user=await accountModel.findOne({IBAN:verified.IBAN})
        console.log(user)
        req.user= user
        return next()
        
    }catch(err){
        return res.status(400).json({message:err})
    }
}
export default authentication;