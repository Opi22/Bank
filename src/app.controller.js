import dbConnect from "./DB/db.connection.js";
import authController from "./auth/auth.controller.js";
import serviceController from "./services/service.controller.js"
const bootsrap= (app, express)=>{
    app.use(express.json())
    // app.post("/register", auth.register)
    app.use("/auth", authController)
    app.use("/service", serviceController)
    dbConnect()

}
export default bootsrap;