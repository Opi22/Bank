import mongoose from "mongoose";
import accountModel from "../DB/models/account.model.js"
import bcrypt from "bcrypt"
import { customAlphabet } from "nanoid";
export const register =async(req, res, next)=>{
try{
    const {username, password,email}= req.body
    if(!username|| !password|| !email){
        return res.status(404).json({message: "missing requirement"})
    }
    
    if(await accountModel.findOne({email})){
        return res.status(400).json({message: "user already exists"})
    }
    const hashedPassword= bcrypt.hashSync(password,10)
    const IBAN= customAlphabet('0123456789', 16)()
    const user= await accountModel.create({
        username, email, password:hashedPassword, IBAN, balance:0
    })
    return res.status(201).json({message: "User Registered successfully", user})

}catch(err){
return res.status(400).json({message: err})
}
}