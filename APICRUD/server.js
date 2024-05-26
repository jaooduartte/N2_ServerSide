import express from "express"
import {router} from "./routes/pet_routes.js" // Importa as rotas definidas

let server = express() // Cria uma instância do servidor Express

server.use(express.json()) // Configura o servidor para entender requisições com JSON
server.use(express.urlencoded({extended: true})) // Configura o servidor para entender requisições URL-encoded
server.use("/", router) // Define que as rotas importadas serão usadas no caminho raiz
server.listen(3000, function (){ //Porta para ser acessada no servidor localhost
    console.log("Porta 3000")
})
