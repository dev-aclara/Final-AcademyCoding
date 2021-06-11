const sequelize = require('sequelize');
const connect = require('../conexao');

const user = connect.define('users', {
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    sobrenome: {
        type: sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
    },
    celular: {
        type: sequelize.BIGINT,
        allowNull: false,
    },
    cidade: {
        type: sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false,
    },
    image: { //fazer o caminho da imagem para renderizar e não armazenar ela no banco de dados
        type: sequelize.STRING,
        allowNull: false
    }

})
user.sync({ force: false}).then(() => { console.log('Tabela Criada') }).catch((e) => { console.log('Erro ao criar a tabela') })

module.exports = user;