import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listarPosts, postNewPost, postArchive, updateNewPost } from '../controllers/postsController.js';

const corsOptions ={
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest: './uploads', storage});

const routes = (app) => {
    // Habilita a devolução de dados em json
    app.use(express.json());
    //
    app.use(cors(corsOptions));
    // Rota para rtetornar todos os posts
    app.get('/posts', listarPosts);
    // Rota para criar novo post
    app.post('/posts', postNewPost )
    // Rota de upload de arquivo
    app.post('/upload', upload.single('archive'), postArchive)
    //
    app.put('/upload/:id', updateNewPost)
    // Rota para rtetornar posts por id
    //app.get('/posts/:id', (req, res) => {
    //    const index = busrcarPorId(req.params.id); // Parmentros dentro da requisição
    //    res.status(200).json(posts[index]);
    //});

};

export default routes;

