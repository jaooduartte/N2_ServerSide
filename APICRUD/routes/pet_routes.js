import express from "express"
import {pet} from "../controller/pet_controller.js" // Importa o controlador com as funções de manipulação de dados

let router = express.Router() // Cria um roteador do Express

// Define as rotas e associa cada uma a uma função do controlador
router.get('/pet', pet.all);
router.get('/pet/search', pet.searchByName);
router.post('/pet', pet.create);
router.put('/pet/:codigo_pet', pet.update);
router.delete('/pet/:codigo_pet', pet.delete);


export {router}