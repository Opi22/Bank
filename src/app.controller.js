import dbConnect from "./DB/db.connection.js";
import authController from "./auth/auth.controller.js";
import * as auth from "./auth/auth.Service.js"
const bootsrap= (app, express)=>{
    app.use(express.json())
    // app.post("/register", auth.register)
    app.use("/auth", authController)
    dbConnect()

}
export default bootsrap;