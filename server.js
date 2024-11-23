import express from 'express';
import routes from './src/routes/postsRoutes.js';


// Inicia a variável e armazena o pacote de servidor
const app = express();
app.use(express.static('uploads'))
routes(app);
// Inicia uma função com listen na porta 3000 para retornar string no console
app.listen(3000,() => {
    console.log('Servidor escutando...');
});


