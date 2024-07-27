const questions = [                                  //inisiasi array yang berisi beberapa object dengan 2 properti ditiap object
    {                                               //object 1 memiliki 2 properti. 
        question: 'Apa ibukota Indonesia?',         //properti pertama merupakan question yang berupa string
        answers: [                                   //properti kedua merupakan answer yang berupa array yang berisi object-object
            { text: 'Jakarta', correct: true },       //object 1 memiliki properti text string & correct boolean.
            { text: 'Surabaya', correct: false },
            { text: 'Bandung', correct: false },
            { text: 'Yogyakarta', correct: false }
        ]
    },
    {
        question: 'Berapa jumlah pulau di Indonesia?',
        answers: [
            { text: '13.466', correct: true },
            { text: '10.000', correct: false },
            { text: '17.504', correct: false },
            { text: '8.000', correct: false }
        ]
    },
    {
        question: 'Siapakah presiden pertama Indonesia?',
        answers: [
            { text: 'Sukarno', correct: true },
            { text: 'Suharto', correct: false },
            { text: 'BJ Habibie', correct: false },
            { text: 'Gus Dur', correct: false }
        ]
    }
];

//inisiasi komponen penunjang 
let currentQuestionIndex = 0;
let score = 0;

//bagian ini merupakan inisiasi komponen dengan mengambil elemen dengan id dari dokumen
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

//buat fungsi untuk memberi event listener click pada nextButton
nextButton.addEventListener('click', () => {        
    currentQuestionIndex++;                         //tambahkan 1 question index
    if (currentQuestionIndex < questions.length) {    //jika index kurang dari panjang question
        setNextQuestion();                           //panggil fungsi 
    } else {                                        //sebaliknya
        showResult();                               //panggil fungsi
    }
});

restartButton.addEventListener('click', restartQuiz); //tambah event listener click ke restartButton dengan memanggil fungsi

//buat fungsi untuk memulai quiz
function startQuiz() {
    currentQuestionIndex = 0;      //inisiasi index question ke 0
    score = 0;                      //atur score 0
    nextButton.classList.remove('hide');             //fungsi classList.remove()/add() digunakan untuk menambah/menghapus class dari sebuah elemen. dari konteks kode, elemen memiliki class hide yang di beri properti display none di css. jadi memiliki arti remove hide elemen.
    resultContainer.classList.add('hide');           //add class hide ke variabel/elemen
    setNextQuestion();                               //panggil fungsi
}

//buat fungsi setNextQuestion
function setNextQuestion() {
    resetState();                                   //panggil fungsi
    showQuestion(questions[currentQuestionIndex]);   //panggil fungsi dengan parameter[index]
}

//buat fungsi untuk menampilkan question
function showQuestion(question) {
    questionContainer.innerText = question.question;            //mengambil properti question dari object milik array question, kemudian ditampilkan dengan innerHTML sebagai text di elemen questionContainer
    question.answers.forEach(answer => {                         //ambil array question, akses object answer. kemudian buat perulangan sejumlah properti milik answer
        const button = document.createElement('button');       //inisiasi dengan membuat elemen button
        button.innerText = answer.text;                         //atur text pada button dengan answer dari question
        button.classList.add('btn');                             //tambahkan class btn ke button
        if (answer.correct) {                                   //jika answer correct 
            button.dataset.correct =  answer.correct;
        }
        button.addEventListener('click', selectAnswer);         //buat event listener click untuk button untuk memanggil fungsi
        answerButtons.appendChild(button);                       //jadikan button child answerButton
    });
}   

// buat fungsi untuk reset
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//buat fungsi select answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

// buat fungsi showResult
function showResult() {
    quizContainer.classList.add('hide');
    questionContainer.classList.add('hide');
    answerButtons.classList.add('hide');
    nextButton.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreText.innerText = `Kamu menjawab dengan benar ${score} dari ${questions.length} pertanyaan.`;
}

function restartQuiz() {
    quizContainer.classList.remove('hide');
    questionContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    startQuiz();
}

startQuiz();