// Redireciona para a página do jogo (index.html)
document.getElementById('start-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; // Certifique-se que o caminho esteja correto
});

// Exibe as informações do usuário ao clicar em "Ver Pontuação"
document.getElementById('score-btn').addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Se não houver token, redireciona para login
        alert('Você precisa fazer login para ver suas informações!');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Envia o token no cabeçalho da requisição
            }
        });

        if (response.ok) {
            const user = await response.json();
            // Exibe as informações do usuário: nome, email e pontuação
            alert(`Nome: ${user.name}\nEmail: ${user.email}\nSua pontuação: ${user.score}`);
        } else {
            // Caso a resposta não seja bem-sucedida, exibe mensagem de erro
            alert('Não foi possível carregar suas informações.');
        }
    } catch (error) {
        // Exibe uma mensagem de erro em caso de falha na requisição
        alert('Erro ao carregar as informações. Tente novamente.');
    }
});

// Função de logout: Remove o token e redireciona para o login
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove o token armazenado
    window.location.href = 'login.html'; // Redireciona para a página de login
});
