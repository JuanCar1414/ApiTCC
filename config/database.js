const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://juancarlosgmr1460:4nbeDlie3o73y68K@bancodedados.b4poz.mongodb.net/?retryWrites=true&w=majority&appName=BancoDeDados');
        console.log('Conectou com o banco de dados');

    } catch (err) {
        console.log('Deu erro na conexao', err)

    }
}

module.exports = { ConnectDB }