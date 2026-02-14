import express from "express"
import bootsrap from "./src/app.controller.js"
const port= 3000
const app= express()
bootsrap(app, express)
app.listen(port, ()=>{
    console.log(` Server is running on https://localhsot:${port}`)
})