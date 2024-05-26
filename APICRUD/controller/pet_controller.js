import connect from "../config/connection.js"; // Importa a função de conexão com o banco de dados

let pet = {};
const con = await connect(); // Cria a conexão com o banco de dados

pet.all = async function (req, res) { //Fazer a busca dos pets
    try {
        let pets = await con.query("SELECT * FROM pets;"); // Comando para mostrar todos os pets cadastrados no banco de dados
        res.send(pets[0]);
    } catch (e) {
        console.log("Erro na consulta", e);
    }
}

pet.searchByName = async function (req, res){ //Procurar os pets por nome
    try {
        let nome_pet = req.query.nome_pet;
        let sql = "SELECT * FROM pets WHERE nome_pet LIKE ?;"; //Buscar o nome do pet
        let values = [`%${nome_pet}%`]; //Aqui é um valor onde busca o nome do pet, não precisando colocar o nome por completo
        let result = await con.query(sql, values);
        res.send(result[0]);
    } catch (e) {
        console.log("Erro na busca por nome", e); // Caso o nome do pet não esteja no banco de dados, retornará este erro
    }
}

pet.create = async function (req, res) { // Criar um novo pet
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


pet.update = async function (req, res) { // Atualizar dados do pet
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

pet.delete = async function (req, res) { // Exclusão do pet
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