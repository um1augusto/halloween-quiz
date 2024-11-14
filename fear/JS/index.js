const questions = [
    {
        question: "What do you call a ghost's favorite dessert?",
        answers: ["I Scream", "Candy Corn", "Pumpkin Pie"],
        correct: 0
    },
    {
        question: "What do you call a witch at the beach?",
        answers: ["A sand-witch", "A broomstick", "A sea witch"],
        correct: 0
    },
    {
        question: "What is a vampire's favorite fruit?",
        answers: ["Blood Orange", "Tomato", "Apple"],
        correct: 0
    },
    {
        question: "What is a mummy's favorite type of music?",
        answers: ["Wrap music", "Pop", "Rock"],
        correct: 0
    },
    {
        question: "What kind of pants do ghosts wear?",
        answers: ["Boo jeans", "Sweatpants", "Shorts"],
        correct: 0
    },
    {
        question: "What do you call a monster who poisons corn?",
        answers: ["A ghoulish kernel", "A scarecrow", "A popcorn monster"],
        correct: 0
    },
    {
        question: "What do you call a witch's garage?",
        answers: ["A broom closet", "A witch hut", "A spooky shed"],
        correct: 0
    },
    {
        question: "Why don’t skeletons fight each other?",
        answers: ["They don’t have guts", "They are scared", "They are friends"],
        correct: 0
    },
    {
        question: "What do you call a haunted chicken?",
        answers: ["A poultrygeist", "A ghost chicken", "A spooky bird"],
        correct: 0
    },
    {
        question: "What is a vampire's favorite game?",
        answers: ["Hide and Seek", "Monopoly", "Blood Wars"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0; // Inicialize a pontuação

// Função para exibir a pergunta atual
function displayQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next');
    const scoreElement = document.getElementById('score');

    resultElement.textContent = '';
    nextButton.style.display = 'none'; // Ocultar o botão de próxima questão até que o jogador faça a escolha

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';

    scoreElement.textContent = `Score: ${score}`; // Atualize a exibição da pontuação

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersElement.appendChild(button);
    });
}

// Função para verificar a resposta e atualizar a pontuação
function checkAnswer(selectedIndex) {
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next');
    const scoreElement = document.getElementById('score');
    const currentQuestion = questions[currentQuestionIndex];
    const audio = document.getElementById("background-audio");
    const backButton = document.getElementById("back");
    const visivel = document.getElementById('visivel');
    const visivel2 = document.getElementById('visivel2');
    const jumpscareDiv = document.getElementById('jumpscare'); // O div do jumpscare
    const html = document.querySelector('html'); // Selecionando o elemento html

    if (selectedIndex === currentQuestion.correct) {
        resultElement.textContent = "Correct!";
        score++; // Aumenta a pontuação
        localStorage.setItem('score', score); // Salva a pontuação no localStorage
        scoreElement.textContent = `Score: ${score}`; // Atualize a exibição da pontuação
        backButton.style.display = "none"; // Ocultar o botão "Back" em caso de resposta correta
        
        nextQuestion();
    } else {
        resultElement.textContent = "Oops! Try again!";
        
        // Não zera a pontuação
        backButton.style.display = "block"; // Exibe o botão "Back" em caso de erro
        audio.volume = 1;
        audio.play();

        // Exibe o jumpscare (imagem de fundo e áudio)
        html.classList.add('jumpscare'); // Adiciona a classe jumpscare ao <html>
        visivel.style.display = "none"; // Esconde as perguntas
        visivel2.style.display = "block"; // Exibe a seção de erro
        return;
    }
    
    nextButton.style.display = "block"; // Exibe o botão de próxima pergunta
}

// Função para ir para a próxima pergunta
function nextQuestion() {
    const next = document.getElementById('next');
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        next.style.display = none
    } else {
        // Ao terminar o quiz, salvar as informações do usuário (exemplo)
        const user = {
            name: 'Nome do Usuário', // Substitua com o nome real
            email: 'usuario@example.com' // Substitua com o e-mail real
        };
        localStorage.setItem('user', JSON.stringify(user)); // Salvar informações do usuário

        // Atualiza a interface com o fim do quiz
        const questionElement = document.getElementById('question');
        const answersElement = document.getElementById('answers');
        const resultElement = document.getElementById('result');
        questionElement.textContent = "Quiz Completed!";
        answersElement.innerHTML = '';
        resultElement.textContent = '';
        document.getElementById('next').style.display = 'none'; // Oculta o botão de próxima questão
    }
}

// Inicializa a primeira pergunta ao carregar a página
window.onload = displayQuestion;
