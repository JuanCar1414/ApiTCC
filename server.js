const express = require('express');
const cors = require('cors');
const usuarioRotas = require('./rotes/usuarioRotes');
const { ConnectDB } = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', usuarioRotas);
//nao pode ter nada antes

ConnectDB();

app.listen(1414, () => {
    console.log('O servidor está aberto e escutando')
})

