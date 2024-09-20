const Usuario = require('../model/usuarioModel');
const bcrypt = require('bcrypt');

exports.CriarUsuario = async (req, res) => {

    //Nao aceita todos os calores logo de cara, os dados de gasto, vencimento e ganhos devem ser executado de maneira individual em cada rota
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

exports.VerGastos = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    try {
        const usuarioLocal = await Usuario.findOne({ NomeUsuario });
        const emailLocal = usuarioLocal.Email;
        const perfilLocal = usuarioLocal.Perfil;
        const { Gastos } = perfilLocal;

        res.status(200).json({ NomeUsuario, emailLocal, Gastos });
    } catch (err) {
        res.status(404).json({ massage: "Usuario nao achado", err });
    }
}

exports.VerGanhos = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    try {
        const usuarioLocal = await Usuario.findOne({ NomeUsuario });
        const emailLocal = usuarioLocal.Email;
        const perfilLocal = usuarioLocal.Perfil;
        const { Ganhos } = perfilLocal;

        res.status(200).json({ NomeUsuario, emailLocal, Ganhos });
    } catch (err) {
        res.status(404).json({ massage: "Usuario nao achado", err });
    }
}

exports.VerVencimentos = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    try {
        const usuarioLocal = await Usuario.findOne({ NomeUsuario });
        const emailLocal = usuarioLocal.Email;
        const perfilLocal = usuarioLocal.Perfil;
        const { Vencimentos } = perfilLocal;

        res.status(200).json({ NomeUsuario, emailLocal, Vencimentos });
    } catch (err) {
        res.status(404).json({ massage: "Usuario nao achado", err });
    }
}

exports.VerUsuario = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    try {
        const usuarioLocal = await Usuario.findOne({ NomeUsuario });
        const emailLocal = usuarioLocal.Email;
        const perfilLocal = usuarioLocal.Perfil;

        res.status(200).json({ NomeUsuario, emailLocal, perfilLocal });
    } catch (err) {
        res.status(404).json({ massage: "Usuario nao achado", err });
    }
}

exports.DeletarUsuario = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario;
    try {
        const usuarioAtualizado = await Usuario.findOneAndDelete({ NomeUsuario })
        if (usuarioAtualizado) {
            res.status(200).json({ massage: "Executado com sucesso" })
        } else {
            res.status(400).json({ massage: "Ação não executada tente novamente" })
        }
    } catch (err) {
        res.status(404).json({ massage: "Usuario nao achado", err });
    }

}

exports.DeletarGasto = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario;
    const GastoApagar = req.body;

    try {
        const NovoUsuario = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $pull: { 'Perfil.Gastos': GastoApagar } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!NovoUsuario) {
            res.status(400).json({ massage: "Item não removido" })
        }

        res.status(200).json({ massage: "Item removido com sucesso" })
    } catch (err) {
        res.status(404).json({ massage: "Usurio não encontrado" })
    }
}

exports.DeletarGanhos = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario;
    const GanhosApagar = req.body;

    try {
        const NovoUsuario = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $pull: { 'Perfil.Ganhos': GanhosApagar } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!NovoUsuario) {
            res.status(400).json({ massage: "Item não removido" })
        }

        res.status(200).json({ massage: "Item removido com sucesso" })
    } catch (err) {
        res.status(404).json({ massage: "Usurio não encontrado" })
    }
}

exports.DeletarVencimento = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario;
    const VencimentoApagar = req.body;

    try {
        const NovoUsuario = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $pull: { 'Perfil.Vencimento': VencimentoApagar } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!NovoUsuario) {
            res.status(400).json({ massage: "Item não removido" })
        }

        res.status(200).json({ massage: "Item removido com sucesso" })
    } catch (err) {
        res.status(404).json({ massage: "Usurio não encontrado" })
    }
}

exports.AddMeta = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    const MetaNew = req.body; // Os novos dados para Ganhos

    try {
        // Atualizar apenas o objeto Ganhos no documento do usuário identificado pelo e-mail
        const usuarioAtualizado = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $push: { 'Perfil.Metas': MetaNew } }, // Atualizar o campo Ganhos
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

exports.VerMeta = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    try {
        const usuarioLocal = await Usuario.findOne({ NomeUsuario });
        const emailLocal = usuarioLocal.Email;
        const perfilLocal = usuarioLocal.Perfil;
        const { Metas } = perfilLocal;

        res.status(200).json({ NomeUsuario, emailLocal, Metas });
    } catch (err) {
        res.status(404).json({ massage: "Usuario nao achado", err });
    }
}

exports.DeletarMeta = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario;
    const MetaApagar = req.body;

    try {
        const NovoUsuario = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $pull: { 'Perfil.Metas': MetaApagar } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!NovoUsuario) {
            res.status(400).json({ massage: "Item não removido" })
        }

        res.status(200).json({ massage: "Item removido com sucesso" })
    } catch (err) {
        res.status(404).json({ massage: "Usurio não encontrado" })
    }
}

exports.AddTarefa = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    const TarefaNew = req.body; // Os novos dados para Ganhos
    try {

        // Atualizar apenas o objeto Ganhos no documento do usuário identificado pelo e-mail
        const usuarioAtualizado = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $push: { 'Perfil.Tarefa': TarefaNew } }, // Atualizar o campo Ganhos
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

exports.VerTarefa = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario; // O e-mail do usuário passado como parâmetro
    try {
        const usuarioLocal = await Usuario.findOne({ NomeUsuario });
        const emailLocal = usuarioLocal.Email;
        const perfilLocal = usuarioLocal.Perfil;
        const { Tarefa } = perfilLocal;

        res.status(200).json({ NomeUsuario, emailLocal, Tarefa });
    } catch (err) {
        res.status(404).json({ massage: "Usuario nao achado", err });
    }
}

exports.DeletarTarefa = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario;
    const TarefaApagar = req.body;

    try {
        const NovoUsuario = await Usuario.findOneAndUpdate(
            { NomeUsuario: NomeUsuario }, // Encontrar o usuário pelo campo Email
            { $pull: { 'Perfil.Tarefas': TarefaApagar } }, // Atualizar o campo Ganhos
            { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
        );

        if (!NovoUsuario) {
            res.status(400).json({ massage: "Item não removido" })
        }

        res.status(200).json({ massage: "Item removido com sucesso" })
    } catch (err) {
        res.status(404).json({ massage: "Usurio não encontrado" })
    }
}

exports.EditarEmail = async (req, res) => {
    const { Email, NomeUsuario } = req.body;  // Certifique-se de que o `Email` está sendo passado na solicitação

    try {
        // Verificar se o usuário existe
        const usuarioLocal = await Usuario.findOne({ NomeUsuario });

        if (!usuarioLocal) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Atualizar o nome do usuário
        const upNovoemail = await Usuario.findOneAndUpdate(
            { NomeUsuario },               // Filtro para encontrar o usuário
            { $set: { Email } }, // Atualização para definir o novo nome
            { new: true }            // Opcional: Retornar o documento atualizado
        );

        // Retornar resposta de sucesso
        res.status(200).json({ msg: 'Email atualizado atualizado com sucesso', usuario: upNovoemail });

    } catch (err) {
        // Log do erro e resposta de erro
        console.error('Erro ao atualizar o nome:', err);
        res.status(500).json({ msg: 'Erro ao atualizar o nome' });
    }
}

exports.MudarSenha = async (req, res) => {
    const NomeUsuario = req.params.NomeUsuario;
    const { NovaSenha, Senha } = req.body;

    try {
        // Aguardar a busca do usuário
        const UsuarioLocal = await Usuario.findOne({ NomeUsuario });

        // Verificar se o usuário existe
        if (!UsuarioLocal) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Comparar a senha atual
        const SenhaConfere = await bcrypt.compare(Senha, UsuarioLocal.Senha);

        if (SenhaConfere) {
            // Criptografar a nova senha
            const senhaEncript = await bcrypt.hash(NovaSenha, 10);
            const UsuarioNovo = await Usuario.findOneAndUpdate(
                { NomeUsuario },
                { $set: { 'Senha': senhaEncript } },
                { new: true, runValidators: true }
            );

            res.status(200).json({ msg: 'Senha atualizada com sucesso', usuario: UsuarioNovo });
        } else {
            res.status(400).json({ message: 'Senha inválida' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno do servidor', err });
    }
}

exports.EsquecerSenha = async (req, res) => {
    const { Email, Senha } = req.body;

    try {
        const UsuarioLocal = await Usuario.findOne({ Email });

        if (!UsuarioLocal) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        };

        const SenhaRashed = await bcrypt.hash(Senha, 10);

        const UsuarioNovo = await Usuario.findOneAndUpdate(
            { UsuarioLocal },
            { $set: { 'Senha': SenhaRashed } },
            { new: true, runValidators: true }
        );

        res.status(200).json({ msg: 'Senha atualizada com sucesso', usuario: UsuarioNovo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno do servidor', err });
    }
}