const { Pool } = require('pg'); //Conexão banco de dados

//Informações de conexão
const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
}

//Função que conecta no banco e executa um script sql
export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(DbConfig);
        const client = await pool.connect();

        const result = await client.query(sqlScript);
        console.log(result.rows);
    } catch (error) {
        console.log('Erro ao executar SQL' + error);
    }
}