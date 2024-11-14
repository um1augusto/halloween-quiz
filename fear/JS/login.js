document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Validação básica
    if (!email || !password) {
        messageElement.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    messageElement.textContent = 'Fazendo login...'; // Mensagem de carregamento

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) // Envia email e senha para o servidor
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token no localStorage
            window.location.href = 'menu.html'; // Redireciona para a página do usuário
        } else {
            const errorMessage = await response.text();
            messageElement.textContent = errorMessage; // Exibe a mensagem de erro
        }
    } catch (error) {
        messageElement.textContent = 'Erro ao fazer login. Tente novamente.'; // Mensagem de erro em caso de falha na requisição
    }
});
