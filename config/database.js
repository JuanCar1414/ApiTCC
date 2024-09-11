const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gabrielsouzacarvalho69:IvIFnUPhrTKyMN8N@banco.vb1sm.mongodb.net/?retryWrites=true&w=majority&appName=Banco');
        console.log('Conectou com o banco de dados');

    } catch (err) {
        console.log('Deu erro na conexao', err)

    }
}

module.exports = { ConnectDB }