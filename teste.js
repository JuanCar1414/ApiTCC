const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Instânciando o express (tornando um objeto)
const app = express();
const port = process.env.PORT || 3000;
// Configuração do banco de dados
const uri = '';
// Conecta com o BD e verifica se deu errado
mongoose.connect(uri)
  .then(() => {console.log('Conectado ao MongoDB');})
  .catch((err) => {console.log('Erro ao conectar ao MongoDB:', err);})

app.use(express.json())
// Rota para autenticação
const usrSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
})
// Cria a pasta "User" no BD
const User = mongoose.model('User', usrSchema)

app.post('/register', async (req, res) => {
  const {username, password} = req.body;
// Verifica se o usuário já existe no Cadastro
  try{
    const exisitingUser = await User.findOne({username});
    if (exisitingUser) {
      return res.status(400).json({error: 'Usuário já existe'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
// Cria um novo usuário
    const newUser = new User({username, password: hashedPassword});
    await newUser.save();
// Verifica se o usuário se registrou com sucesso
    res.status(201).json({message: 'Usuário registrado com sucesso'});
  } catch (error) {
    res.status(500).json({error: 'Erro ao registrar usuário'});
  }
})
// Verifica se o usuário existe no Login
app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(401).json({error: 'Usuário não encontrado'});
    }
    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({error: 'Senha incorreta'});
    }
    // Gera um token JWT
    const token = jwt.sign({username}, 'secretpassword', {expiresIn: '1h'});
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({error: 'Erro ao autenticar usuário'});
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})