const quizData = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    answer: '4',
  },
  {
    question: 'Which language is used for web styling?',
    options: ['HTML', 'CSS', 'JavaScript'],
    answer: 'CSS',
  },
  {
    question: 'Which keyword declares a variable in JavaScript?',
    options: ['var', 'let', 'const'],
    answer: 'let',
  },
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const q = quizData[currentQuestion];
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options
      .map(
        (opt) => `
      <label>
        <input type="radio" name="answer" value="${opt}"> ${opt}
      </label>
    `
      )
      .join('')}
  `;
}

document.getElementById('submit-btn').addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert('Please select an answer!');

  if (selected.value === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById(
      'result'
    ).innerText = `Your score: ${score}/${quizData.length}`;
  }
});

showQuestion();
