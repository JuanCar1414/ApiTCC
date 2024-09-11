const mongoose = require('mongoose');


const UsuarioModel = new mongoose.Schema(
    {
        Email: String,
        Senha: String,
        NomeUsuario: { type: String, required: true, unique: true },
        Perfil: {
            Ganhos: [{
                Valor: Number,
                Nome: String,
                Descricao: String,
                Mes: String,
            }],
            Gastos: [{
                Valor: Number,
                Nome: String,
                Descricao: String,
                Tipo: String,
                Mes: String,
            }],
            Vencimento: [{
                Conta: String,
                isVencimento: Boolean,
                Vencimento: String,
            }]
        }
    }
)

const Usuario = mongoose.model('Usuario', UsuarioModel)

module.exports = Usuario

