import express from "express"
import {aluno} from "../controller/aluno_controller.js"

let router = express.Router()
router.get ('/aluno', aluno.all)
router.post ('/aluno', aluno.create)
router.put ('/aluno/:id_aluno', aluno.update)
router.delete ('/aluno/:id_aluno', aluno.delete)

export {router}