const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'meu segredo';

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz'
});

// Middleware para autenticação de token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Endpoint de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send('Erro no servidor.');

        if (results.length === 0) {
            return res.status(400).send('Email ou senha inválidos');
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(400).send('Email ou senha inválidos');
        }

        // Login bem-sucedido, gerar o token
        const token = jwt.sign({ email: user.email }, SECRET_KEY);
        res.json({ token });
    });
});

// Endpoint de registro
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Erro ao registrar usuário.');
        res.sendStatus(201); // Usuário registrado com sucesso
    });
});


// Rota para obter dados do usuário logado
/*Rota /user: Esta rota só pode ser acessada se o token JWT for válido.
O middleware authenticateToken é executado antes da rota. Se o token for válido, a função da rota continua e retorna os dados do usuário.
*/
app.get('/user', authenticateToken, (req, res) => {
    db.query('SELECT email, name, score FROM users WHERE email = ?', [req.user.email], (err, result) => {
      if (err) throw err;
  
      if (result.length === 0) {
        return res.status(404).send('Usuário não encontrado');
      }
  
      res.json(result[0]); // Retorna os dados do usuário (email, nome, pontuação)
    });
});

// Rotas para atualizar usuário
app.put('/user', authenticateToken, async (req, res) => {
    const { newEmail, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    db.query('UPDATE users SET email = ?, password = ? WHERE email = ?', [newEmail, hashedPassword, req.user.email], (err, result) => {
        if (err) return res.status(500).send('Erro ao atualizar usuário.');
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }
        res.send('Usuário atualizado com sucesso.');
    });
});

// Rotas para deletar usuário
app.delete('/user', authenticateToken, (req, res) => {
    db.query('DELETE FROM users WHERE email = ?', [req.user.email], (err, result) => {
        if (err) return res.status(500).send('Erro ao deletar usuário.');
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }
        res.send('Usuário deletado com sucesso.');
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
