import mysql2 from "mysql2/promise"

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection

    const mysql = mysql2
    const connection = await mysql.createConnection("mysql://root:jpdx1906@localhost:3306/petshop")
    
    console.log("Conectado ao DataBase PETSHOP-MySQL")
    global.connection = connection
    return connection
}
export default connect 