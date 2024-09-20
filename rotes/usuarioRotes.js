const Router = require('express').Router();
const usuarioLogicas = require('../controller/usuarioController')

Router.post('/cadastro', usuarioLogicas.CriarUsuario);
Router.post('/login', usuarioLogicas.LogarUsuario);

Router.post('/:NomeUsuario/add-ganhos', usuarioLogicas.AddGanho);
Router.post('/:NomeUsuario/add-gastos', usuarioLogicas.AddGasto);
Router.post('/:NomeUsuario/add-vencimento', usuarioLogicas.AddVencimento);

Router.get('/:NomeUsuario/ver-ganhos', usuarioLogicas.VerGanhos);
Router.get('/:NomeUsuario/ver-gastos', usuarioLogicas.VerGastos);
Router.get('/:NomeUsuario/ver-vencimento', usuarioLogicas.VerVencimentos);

Router.get('/:NomeUsuario/visualizar', usuarioLogicas.VerUsuario);

Router.delete('/:NomeUsuario/deletar-perfil', usuarioLogicas.DeletarUsuario);
Router.delete('/:NomeUsuario/deletar-gasto', usuarioLogicas.DeletarGasto);
Router.delete('/:NomeUsuario/deletar-ganhos', usuarioLogicas.DeletarGanhos);
Router.delete('/:NomeUsuario/deletar-vencimento', usuarioLogicas.DeletarVencimento);

Router.post('/:NomeUsuario/add-meta', usuarioLogicas.AddMeta);
Router.get('/:NomeUsuario/ver-meta', usuarioLogicas.VerMeta);
Router.delete('/:NomeUsuario/deletar-meta', usuarioLogicas.DeletarMeta);

Router.post('/:NomeUsuario/add-tarefa', usuarioLogicas.AddTarefa);
Router.get('/:NomeUsuario/ver-tarefa', usuarioLogicas.VerTarefa);
Router.delete('/:NomeUsuario/deletar-tarfera', usuarioLogicas.DeletarTarefa);

Router.put('/atualizar-nome', usuarioLogicas.EditarNome);
Router.put('/atualizar-email', usuarioLogicas.EditarEmail);
Router.put('/:NomeUsuario/atualizar-senha', usuarioLogicas.MudarSenha);

Router.put('/esqueci-senha', usuarioLogicas.EsquecerSenha);

module.exports = Router;

