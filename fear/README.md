Halloween Quiz
Descrição do Projeto
O Halloween Quiz é um jogo interativo onde o jogador responde a perguntas sobre o universo de Halloween. A cada resposta correta, o jogador acumula pontos. Caso a resposta esteja errada, o jogo exibe um "jumpscare" para assustar o jogador, tornando a experiência mais divertida e imersiva. O jogo envolve funcionalidades de autenticação de usuários e armazenamento de pontuações utilizando JWT (JSON Web Token) para proteger as rotas de acesso aos dados sensíveis.

O projeto é desenvolvido usando HTML, CSS, JavaScript, Node.js e MySQL para o backend. O banco de dados armazena as informações de login, senhas (devidamente criptografadas) e as pontuações dos jogadores.


Funcionalidades

Login e Registro: O usuário pode se registrar com um email e senha, e acessar sua conta a qualquer momento.

Quiz de Halloween: Responda perguntas sobre Halloween! Acertos somam pontos, e erros desencadeiam uma animação de "jumpscare".

Pontuação: A pontuação do usuário é armazenada no banco de dados e pode ser visualizada a qualquer momento.

Jumpscare: Se você errar uma pergunta, vai se assustar com uma animação e um som de Halloween para deixar o clima ainda mais divertido.

Como Jogar
Login ou Registro: Se você é novo, registre-se. Se já tem conta, faça login.
Jogar: Responda as perguntas sobre Halloween. A cada resposta correta, você ganha pontos.
Jumpscare: Se errar uma pergunta, um jumpscare vai te surpreender!
Ver Pontuação: A pontuação vai sendo acumulada, e você pode checar sua evolução a qualquer momento.

*EXECUTAR O PROJETO*

1. Clonar o repositório
Primeiro, clone o repositório para o seu computador:

git clone https://github.com/um1augusto/halloween-quiz.git
cd halloween-quiz

2. Instalar dependências do Backend

No diretório do backend (onde está o arquivo server.js), execute:

npm install

3. Configurar o Banco de Dados

Crie um banco de dados chamado quiz no MySQL.
No banco de dados, crie uma tabela users para armazenar os dados dos usuários:

CREATE DATABASE quiz;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  score INT DEFAULT 0
);

Configure as credenciais de acesso ao banco de dados no arquivo server.js.

4. Rodar o Backend

No diretório do backend, inicie o servidor com:

node server.js

*COMO JOGAR*

1. Login ou Registro: Se você é novo, registre-se. Se já tem conta, faça login.

2. Jogar: Responda as perguntas sobre Halloween. A cada resposta correta, você ganha pontos.

3. Jumpscare: Se errar uma pergunta, um jumpscare vai te surpreender!

4. Ver Pontuação: A pontuação vai sendo acumulada, e você pode checar sua evolução a qualquer momento.


*INTEGRANTES*

AUGUSTO RODRIGUES DE CASTRO
ALINE MENTZ
AUGUSTO ALEXANDRE MORAIS


