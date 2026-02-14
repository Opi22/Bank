import express from "express"
import bootsrap from "./src/app.controller.js"
const port= 3000
const app= express()
app.use(express.json())
bootsrap(app, express)
app.listen(port, ()=>{
    console.log(`Server is running on https://localhost:${port}`)
})