window.onload = function() {
    const userInfoElement = document.getElementById('userInfo');
    const scoreDisplayElement = document.getElementById('scoreDisplay');
    
    // Recupera as informações do usuário do localStorage
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const score = localStorage.getItem('score') || 0;

    if (!user || !user.name || !user.email) {
        userInfoElement.textContent = 'Usuário não encontrado. Faça login novamente.';
        scoreDisplayElement.textContent = '';
        return;
    }

    // Exibe as informações do usuário
    userInfoElement.innerHTML = `
        <p><strong>Nome:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
    `;

    // Exibe a pontuação do usuário
    scoreDisplayElement.innerHTML = `
        <p><strong>Pontuação:</strong> ${score}</p>
    `;
};
