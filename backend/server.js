const express = require('express');
const bodyparse = require('body-parser');
const user = require('./database/models/user');
const pb = require('./database/models/pb');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

app.use(bodyparse.urlencoded({ extended: false }));
app.use(bodyparse.json());
app.use(session({
    secret: 'keyboard car',
    name: 'essecookie',
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

const port = 8080;

app.use(cors());



app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/', (req, res) => {
    res.send('Api Smart Breeder');
})


app.post('/register', function (req, res) {
    const name = req.body.name;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const celular = req.body.celular;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const username = req.body.username;
    const senha = req.body.senha;
    const image = req.body.image;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    user.findOne({ where: { email: email } }).then(result => {
        if (result != null) {
            return res.json("Este e-mail já está sendo utlizado!");
        }
        else {
            user.create({
                name: name,
                sobrenome: sobrenome,
                email: email,
                celular: celular,
                cidade: cidade,
                estado: estado,
                username: username,
                senha: hash,
                image: image
            }).then(() => { return res.json("Sucesso ao gravar") })

        }
    })

})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    user.findOne({ where: { email: email } }).then(result => {
        var verify = bcrypt.compareSync(senha, result.senha);
        if (verify) {
            req.session.result = {
                id: result.id,
                name: result.name,
                email: result.email,
                image: result.image,
                username: result.username,
                cidade: result.cidade,
                estado: result.estado,
                celular: result.celular
            }
            return res.send(req.session.result);
        } else {
            return res.json('Senha inválida!');
        }
    })
})

app.post('/create-post', (req, res) => {
    const username = req.body.username;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;
    const celular = req.body.celular;

    pb.create({
        username: username,
        titulo: titulo,
        conteudo: conteudo,
        cidade: cidade,
        estado: estado,
        celular: celular

    }).then(() => { return res.json("Sucesso ao gravar") })

})

app.post('/filtrarPosts', (req, res) => {

    const tipo = req.body.tipo;
    const filtro = req.body.filtro;

    pb.findAll({
        where: {
            [tipo]: filtro
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.json(result)
    })
})

app.get('/allPosts', (req, res) => {

    pb.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.json(result)
    })
})




app.listen(port, () => {
    console.log('listen 8080');
})