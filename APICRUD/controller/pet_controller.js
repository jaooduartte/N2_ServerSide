import connect from "../config/connection.js"; 

let pet = {};
const con = await connect(); 

pet.all = async function (req, res) { 
    try {
        let pets = await con.query("SELECT * FROM pets;"); 
        res.send(pets[0]);
    } catch (e) {
        console.log("Erro na consulta", e);
    }
}

pet.searchByName = async function (req, res){ 
    try {
        let nome_pet = req.query.nome_pet;
        let sql = "SELECT * FROM pets WHERE nome_pet LIKE ?;"; 
        let values = [`%${nome_pet}%`]; //Aqui é um valor onde busca o nome do pet, não precisando colocar o nome por completo
        let result = await con.query(sql, values);
        res.send(result[0]);
    } catch (e) {
        console.log("Erro na busca por nome", e);
    }
}

pet.create = async function (req, res) { 
    try {
        let pet = req.body;
        let sql = "INSERT INTO pets (codigo_pet, nome_pet, genero_pet) VALUES (?, ?, ?);";
        let values = [pet.codigo_pet, pet.nome_pet, pet.genero_pet];
        let result = await con.query(sql, values);
        res.send({
            status: "Inserção efetuada com sucesso!",
            result: result
        });
    } catch (e) {
        console.log("Erro na inserção", e);
    }
}


pet.update = async function (req, res) {
    try {
        let id = req.params.codigo_pet; 
        let pet = req.body;
        let sql = "UPDATE pets SET nome_pet = ?, genero_pet = ? WHERE codigo_pet = ?;"; 
        const values = [pet.nome_pet, pet.genero_pet, id];
        let result = await con.query(sql, values);
        res.send({
            status: `Atualização do pet ${pet.nome_pet} efetuada com sucesso!`,
            result: result
        });
    } catch (e) {
        console.log("Erro na atualização", e);
    }
}

pet.delete = async function (req, res) { 
    try {
        let id = req.params.codigo_pet;
        let sql = "DELETE FROM pets WHERE codigo_pet = ?;";
        let result = await con.query(sql, [id]);
        res.send({
            status: `Exclusão do pet ${id} efetuada com sucesso!`,
            result: result
        });
    } catch (e) {
        console.log("Erro na exclusão", e);
    }
}

export { pet };