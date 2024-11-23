import fs from 'fs';
import { getAllPosts, createPost, updatePost } from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/gemini.js";


// Definição de função que retorna todos os posts do banco de dados
export async function listarPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

// Definição de função que cria novo post no banco de dados
export async function postNewPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({'erro':'Falha ao criar post'})
    }
};

// Definição de função para upload de arquivo
export async function postArchive(req, res){
    const newPost = {
         description : '',
         imgUrl: req.file.originalname,
         alt: ''

    };

    try {
        const createdPost = await createPost(newPost);
        const renameArchive = `uploads/${createdPost.insertedId}.jpeg`
        fs.renameSync(req.file.path, renameArchive)
        res.status(200).json(createdPost);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({'erro':'Falha ao criar post'})
    }
};

// 
export async function updateNewPost(req, res) {
    const idPost = req.params.id;
    const urlImg = `http://localhost:3000/${idPost}.jpeg`

    try {

        const imgBuffer = fs.readFileSync(`uploads/${idPost}.jpeg`);
        const desc = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImg,
            description: desc,
            alt: req.body.alt
        }
        const createdPost = await updatePost(idPost, post);
        res.status(200).json(createdPost);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({'erro':'Falha ao criar post'})
    }
};

