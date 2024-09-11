const Usuario = require('../model/usuarioModel');
const bcrypt = require('bcrypt');

exports.CriarUsuario = async (req, res) => {
    const { Email, Senha, NomeUsuario } = req.body;
    try {
        const jaExiste = await Usuario.findOne({ Email });
        if (jaExiste) {
            res.status(561).json({ err: 'Usuario ja cadastrado' });
        }

        const senhaEncript = await bcrypt.hash(Senha, 10);
        const novoUsuario = new Usuario({ Email, Senha: senhaEncript, NomeUsuario });
        await novoUsuario.save();
        res.status(201).json({ massege: 'Usuario Criado' })
    } catch (err) {
        res.status(501).json({ message: "Usuário não foi cadastrado" })
    }
}

exports.LogarUsuario = async (req, res) => {
    const { Email, senha } = req.body;

    try {

        const usuarioLocal = await Usuario.findOne({ Email });

        if (!usuarioLocal) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const isSenhaValida = await bcrypt.compare(senha, usuarioLocal.Senha);

        if (!isSenhaValida) {
            return res.status(401).json({ message: "Senha inválida" });
        }
        res.status(200).json({ msg: "Logado com sucesso" });

    } catch (err) {
        // Capturar e retornar qualquer erro que ocorrer
        console.error('Erro ao logar usuário:', err);
        res.status(500).json({ message: "Erro interno do servidor", err });
    }
}

exports.EditarNome = async (req, res) => {
    const { Email, NomeUsuario } = req.body;  // Certifique-se de que o `Email` está sendo passado na solicitação

    try {
        // Verificar se o usuário existe
        const usuarioLocal = await Usuario.findOne({ Email });

        if (!usuarioLocal) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Atualizar o nome do usuário
        const upNovonome = await Usuario.findOneAndUpdate(
            { Email },               // Filtro para encontrar o usuário
            { $set: { NomeUsuario } }, // Atualização para definir o novo nome
            { new: true }            // Opcional: Retornar o documento atualizado
        );

        // Retornar resposta de sucesso
        res.status(200).json({ msg: 'Nome atualizado com sucesso', usuario: upNovonome });

    } catch (err) {
        // Log do erro e resposta de erro
        console.error('Erro ao atualizar o nome:', err);
        res.status(500).json({ msg: 'Erro ao atualizar o nome' });
    }
}

exports.AddGanho = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    const ganhosNew = req.body; // Os novos dados para Ganhos

    try {
        // Atualizar apenas o objeto Ganhos no documento do usuário identificado pelo e-mail
        const usuarioAtualizado = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $push: { 'Perfil.Ganhos': ganhosNew } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar o objeto Ganhos:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

exports.AddGasto = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    const gastosNew = req.body; // Os novos dados para Ganhos

    try {
        // Atualizar apenas o objeto Ganhos no documento do usuário identificado pelo e-mail
        const usuarioAtualizado = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $push: { 'Perfil.Gastos': gastosNew } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar o objeto Gastos:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

exports.AddVencimento = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    const VencimentoNew = req.body; // Os novos dados para Ganhos

    try {
        // Atualizar apenas o objeto Ganhos no documento do usuário identificado pelo e-mail
        const usuarioAtualizado = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $push: { 'Perfil.Vencimento': VencimentoNew } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar o objeto Gastos:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

exports.VerGanhos = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    const ganhosNew = req.body; // Os novos dados para Ganhos

    try {
        // Atualizar apenas o objeto Ganhos no documento do usuário identificado pelo e-mail
        const usuarioAtualizado = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $push: { 'Perfil.Ganhos': ganhosNew } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar o objeto Ganhos:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}


