document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Validação básica
    if (!email || !password) {
        messageElement.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    messageElement.textContent = 'Registrando...'; // Mensagem de carregamento

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            messageElement.textContent = 'Usuário registrado com sucesso!';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            const errorMessage = await response.text();
            messageElement.textContent = errorMessage;
        }
    } catch (error) {
        messageElement.textContent = 'Erro ao registrar usuário. Tente novamente.';
    }
});
