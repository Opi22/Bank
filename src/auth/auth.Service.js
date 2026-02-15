import mongoose from "mongoose";
import accountModel from "../DB/models/account.model.js"
import bcrypt from "bcrypt"
import { customAlphabet } from "nanoid";
import jwt from "jsonwebtoken"
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

export const login=async(req, res, next)=>{
    try{
        const {email, password}=req.body
        if(!email|| !password){
            return res.status(404).json({message:"Missing argument can not logging"})
        }
        const user= await accountModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"worng email or password"})
        }
        const match= bcrypt.compareSync(password, user.password)
         if(!match){
            return res.status(400).json({message:"worng email or password"})
        }
        const token= jwt.sign({IBAN:user.IBAN}, "1234")
        return res.status(200).json({message:"logged in successfully", token})

    }catch(err){
        return res.status(500).json({message:err})
    }
}