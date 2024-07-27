const questions = [                                  //inisiasi array yang berisi beberapa object dengan 2 properti ditiap object
    {                                               //object 1 memiliki 2 properti. 
        question: 'Apa Makanan Kesukaan Sholum',         //properti pertama merupakan question yang berupa string
        answers: [                                   //properti kedua merupakan answer yang berupa array yang berisi object-object
            { text: 'Soto', correct: false },       //object 1 memiliki properti text string & correct boolean.
            { text: 'Rawon', correct: false },
            { text: 'Pecel Ibuke', correct: true },
            { text: 'Nasi Goreng Bpake', correct: true },
            { text: 'Rujak Ibuke', correct: true },
            { text: 'Soto babat', correct: true }
        ]
    },
    {
        question: 'Berapa jumlah game yang aktif dimainka Sholum',
        answers: [
            { text: '2', correct: false },
            { text: '7', correct: false },
            { text: '3', correct: true },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'Berapa level akun HI3, GI & HSR Sholum',
        answers: [
            { text: '80, 55, 45', correct: false },
            { text: '98, 65, 88', correct: false },
            { text: '88, 60, 70', correct: true },
            { text: '90, 70, 80', correct: false }
        ]
    },
    {
        question: 'Di HI3 rank tertinggi Superstring Dimension yang dicapai Sholum apa?',
        answers: [
            { text: 'Sinfull', correct: false },
            { text: 'Agony', correct: false },
            { text: 'Nirvana', correct: false },
            { text: 'Redlotus', correct: true }
        ]
    },
    {
        question: 'Di HI3 siapa valkrye Favorit Sholum',
        answers: [
            { text: 'Kiana', correct: true },
            { text: 'Yae Sakura', correct: true },
            { text: 'Bronya', correct: true },
            { text: 'Mei', correct: true },
            { text: 'Durandal', correct: true },
            { text: 'Luna', correct: true },
            { text: 'Rita', correct: true },
            { text: 'Raven', correct: false }
        ]
    },
    {
        question: 'Di HI3 siapa valkrye Favorit Sholum',
        answers: [
            { text: 'Kiana', correct: true },
            { text: 'Yae Sakura', correct: true },
            { text: 'Bronya', correct: true },
            { text: 'Mei', correct: true },
            { text: 'Durandal', correct: true },
            { text: 'Luna', correct: true },
            { text: 'Rita', correct: true },
            { text: 'Raven', correct: false }
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

//buat fungsi restart untuk meremove class hide untuk beberapa elemen, agar tampil seperti saat awal
function restartQuiz() {
    quizContainer.classList.remove('hide');                 
    questionContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    startQuiz();
}

startQuiz();