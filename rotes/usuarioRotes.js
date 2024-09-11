const Router = require('express').Router(); 
const usuarioLogicas =  require('../controller/usuarioController')


Router.post('/cadastro', usuarioLogicas.CriarUsuario);
Router.post('/login', usuarioLogicas.LogarUsuario);
Router.put('/atualizar-nome', usuarioLogicas.EditarNome);

module.exports = Router;

