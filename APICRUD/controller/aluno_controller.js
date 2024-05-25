import connect from "../config/connection.js";

let aluno = {}
const con = await connect()

aluno.all = async function (req, res) {
    try {
        let alunos = await con.query("SELECT * FROM alunos;")
        res.send(alunos[0])
    } catch (e) {
        console.log("Erro na consulta", e);
    }
}

aluno.create = async function (req, res) {
    try {
        let aluno = req.body
        let sql = "INSERT INTO alunos (id_aluno, nome_aluno, idade_aluno, email_aluno) VALUES (?, ?, ?, ?);"
        let values = [aluno.id_aluno, aluno.nome_aluno, aluno.idade_aluno, aluno.email_aluno]
        let result = await con.query(sql, values)
        res.send({
            status: "Inserção efetuada com sucesso!",
            result: result
        })
    } catch (e) {
        console.log("Erro na inserção", e);
    }
}

aluno.update = async function (req, res) {
    try {
        let id = req.params.id_aluno
        let aluno = req.body
        let sql = "UPDATE alunos SET nome_aluno = ?, idade_aluno = ?, email_aluno = ? WHERE id_aluno = ?;"
        const values = [aluno.nome_aluno, aluno.idade_aluno, aluno.email_aluno, id]
        let result = await con.query(sql, values)
        res.send({
            status: "Atualização do:" + aluno.nome_aluno + aluno.idade_aluno + aluno.email_aluno + id,
            result: result
        })
    } catch (e) {
        console.log("Erro na atualização", e);
    }
}

aluno.delete = async function (req, res) {
    try {
        let id = req.params.id_aluno
        let sql = "DELETE FROM alunos WHERE id_aluno = ?;"
        let result = await con.query(sql, [id])
        res.send({
            status: "Exclusão do " + id + "efetuada com sucesso!",
            result: result
        })
    } catch (e) {
        console.log("Erro na exclusão", e);
    }
}

export { aluno }