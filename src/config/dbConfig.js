import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    try {
        const client = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await client.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return client;
    } catch (erro) {
        console.log('Falha ao conectar ao banco de dados', erro);
        process.exit();
    }
}
