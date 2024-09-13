const Router = require('express').Router();
const usuarioLogicas = require('../controller/usuarioController')


Router.post('/cadastro', usuarioLogicas.CriarUsuario);
Router.post('/login', usuarioLogicas.LogarUsuario);
Router.put('/atualizar-nome', usuarioLogicas.EditarNome);

Router.post('/:NomeUsuario/add-ganhos', usuarioLogicas.AddGanho);
Router.post('/:NomeUsuario/add-gastos', usuarioLogicas.AddGasto);
Router.post('/:NomeUsuario/add-vencimento', usuarioLogicas.AddVencimento);

Router.get('/:NomeUsuario/ver-ganhos', usuarioLogicas.VerGanhos);
Router.get('/:NomeUsuario/ver-gastos', usuarioLogicas.VerGastos);
Router.get('/:NomeUsuario/ver-vencimento', usuarioLogicas.VerVencimentos);

Router.get('/:NomeUsuario/visualizar', usuarioLogicas.VerUsuario);

module.exports = Router;

