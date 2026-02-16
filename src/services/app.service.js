import accountModel from "../DB/models/account.model.js";
import transactionModel from "../DB/models/transaction.model.js";
export const Balance=async(req, res)=>{
try{
const {IBAN, balance}= req.user;
 return res.status(200).json({message:"Showing balance", IBAN, balance})
}catch(err){
   return res.status(500).json({message:err})
}
}
export const Deposit=async(req, res)=>{
    // in this service we add money to the 
    // balance by incrementing the value 
    // we get from the user request 
    try{
        const {amount}= req.body
        const {email}= req.user
        const user= await accountModel.findOne({email})
        if(user){
            user.balance+=amount
            await user.save()
            return res.status(201).json({message:`Successfully added ${amount} to your account`})
        }
        return res.status(400).json({message:"Something went wront please try again"})
    }catch(err){
        return res.status(500).json({message:err})
    }

}
export const Withdraw=async(req, res)=>{
    // in this service we take money from 
    // balance by decrementing the value 
    // we get from the user request 
    try{
        const {amount}= req.body
        const {email}= req.user
        const user= await accountModel.findOne({email})
        if(user){
            if(amount>user.balance){
                return res.status(400).json({message:"Insufficent balance to complete"})
            }
            user.balance-=amount
            await user.save()
            return res.status(201).json({message:`Successfully removed ${amount} from your account`})
        }
        return res.status(400).json({message:"Something went wront please try again"})
    }catch(err){
        return res.status(500).json({message:err})
    }

}


export const Transfer= async(req, res)=>{
    try{
        const {amount, reciever}=req.body
        if(!amount||!reciever){
            return res.status(400).json({message:"Missing requirements"}) 
        }
        if(req.user.balance<amount){
            return res.status(400).json({message:"insufficent balance to continue"}) 
        }
        const userReciever=await accountModel.findOne({IBAN:reciever})
        if(!userReciever){
            return res.status(400).json({message:"reciever not Found "})
        }
        const userSender=await accountModel.findOne({email:req.user.email})
        if(userSender){
            userSender.balance-=amount;
            await userSender.save()
            userReciever.balance+=amount;
            await userReciever.save()
            await transactionModel.create({
                sender:req.user.IBAN,
                amount,
                reciever
            })
            return res.status(201).json({message:`Successfully send ${amount} to ${reciever}`})
        }
        return res.status(400).json({message:"Something went wrong"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}