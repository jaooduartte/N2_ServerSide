import express from "express"
import {pet} from "../controller/pet_controller.js" 

let router = express.Router() 

router.get('/pet', pet.all);
router.get('/pet/search', pet.searchByName);
router.post('/pet', pet.create);
router.put('/pet/:codigo_pet', pet.update);
router.delete('/pet/:codigo_pet', pet.delete);


export {router}