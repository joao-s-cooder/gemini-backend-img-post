import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conectar ao banco de dados usando string de conexao da variavel de ambiente
const conexao = await conectarAoBanco(process.env.CONECTION_STRING);

// Definição de função que retorna todos os posts do banco de dados
export async function getAllPosts() {
    const db = conexao.db('imersao-instabytes');
    const colection = db.collection('posts');
    return colection.find().toArray();
};

// Definição de função cria o post no banco de dados
export async function createPost(newPost){
    const db = conexao.db('imersao-instabytes');
    const colection = db.collection('posts');
    return colection.insertOne(newPost);
} 

// 
export async function updatePost(idPost, newPost){
    const db = conexao.db('imersao-instabytes');
    const colection = db.collection('posts');
    const objID = ObjectId.createFromHexString(idPost);
    return colection.updateOne({_id: new ObjectId(objID)}, {$set:newPost});
} 


