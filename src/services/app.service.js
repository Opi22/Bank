import accountModel from "../DB/models/account.model.js";
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