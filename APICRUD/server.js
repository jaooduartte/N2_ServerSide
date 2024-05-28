import express from "express"
import {router} from "./routes/pet_routes.js" 

let server = express() // Cria uma instância do servidor Express

server.use(express.json()) // Configura o servidor para entender requisições com JSON
server.use(express.urlencoded({extended: true})) // Configura o servidor para entender requisições URL-encoded
server.use("/", router) 
server.listen(3000, function (){ 
    console.log("Porta 3000")
})
