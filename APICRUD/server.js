import express, {Router, urlencoded} from "express"
import {router} from "../APICRUD/routes/aluno_routes.js"

//importação das rotas
let server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use("/", router)
server.listen(3000, function (){
    console.log("Porta 3000")
})
