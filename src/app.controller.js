import dbConnect from "./DB/db.connection.js";
const bootsrap= (app, express)=>{
    app.use(express.json())
    dbConnect()
}
export default bootsrap;