const Router = require('express').Router(); 
const usuarioLogicas =  require('../controller/usuarioController')


Router.post('/cadastro', usuarioLogicas.CriarUsuario);
Router.post('/login', usuarioLogicas.LogarUsuario);
Router.put('/atualizar-nome', usuarioLogicas.EditarNome);

Router.post('/:NomeUsuario/ganhos', usuarioLogicas.AddGanho);
Router.post('/:NomeUsuario/gastos', usuarioLogicas.AddGasto);
Router.post('/:NomeUsuario/vencimento', usuarioLogicas.AddVencimento);

module.exports = Router;

