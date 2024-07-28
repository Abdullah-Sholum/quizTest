const questions = [                                     //inisiasi array yang berisi beberapa object dengan 2 properti ditiap object
    {                                                   //object 1 memiliki 2 properti. 
        question: 'Apa Makanan Kesukaan Sholum',        //properti pertama merupakan question yang berupa string
        answers: [                                      //properti kedua merupakan answer yang berupa array yang berisi object-object
            { text: 'Soto', correct: false },           //object 1 memiliki properti text string & correct boolean.
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
            { text: 'Elysia', correct: true },
            { text: 'Durandal', correct: true },
            { text: 'Luna', correct: true },
            { text: 'Rita', correct: true },
            { text: 'Raven', correct: false }
        ]
    },
    {
        question: 'Di GI siapa Character Favorit Sholum',
        answers: [
            { text: 'Yae Miko', correct: true },
            { text: 'Raiden Shogun', correct: true },
            { text: 'Nahida', correct: true },
            { text: 'Furina', correct: true },
            { text: 'Zhongli', correct: true },
            { text: 'Diluc', correct: true },
            { text: 'Childe', correct: false },
            { text: 'Scaramouche', correct: false }
        ]
    },
    {
        question: 'Di HSR siapa Character Favorit Sholum',
        answers: [
            { text: 'FireFly', correct: true },
            { text: 'Bronya SW', correct: true },
            { text: 'Bronya Rand', correct: true },
            { text: 'Seele', correct: true },
            { text: 'Ruan Mei', correct: true },
            { text: 'Boothil', correct: false },
            { text: 'JingYuan', correct: false }
        ]
    },
    {
        question: 'Layout controller favorit Sholum',
        answers: [
            { text: 'Xbox', correct: true },
            { text: 'Nintendo', correct: false },
            { text: 'DualShock', correct: false },
        ]
    },
    {
        question: 'apa genre game kesukaan Sholum',
        answers: [
            { text: 'RPG', correct: true },
            { text: 'FPS', correct: true },
            { text: 'Action', correct: true },
            { text: 'Simulator', correct: false },
        ]
    }
];

//inisiasi variabel untuk menyimpan index & score
let currentQuestionIndex = 0;
let score = 0;

//bagian ini merupakan inisiasi komponen dengan mengambil elemen dari dokumen berdasarkan id
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

//buat fungsi untuk memberi event listener click pada nextButton
nextButton.addEventListener('click', () => {            //buat event listener click untuk tombol next kemudian buat fungsi anonim
    currentQuestionIndex++;                             //tambahkan 1 question index
    if (currentQuestionIndex < questions.length) {      //jika index kurang dari panjang question
        setNextQuestion();                              //panggil fungsi 
    } else {                                            //sebaliknya
        showResult();                                   //panggil fungsi
    }
});

restartButton.addEventListener('click', restartQuiz);   //tambah event listener click ke restartButton dengan memanggil fungsi

//buat fungsi untuk memulai quiz
function startQuiz() {
    currentQuestionIndex = 0;                       //inisiasi index question ke 0
    score = 0;                                      //inisiasi score 0
    nextButton.classList.remove('hide');            //fungsi classList.remove()/add() digunakan untuk menambah/menghapus class dari sebuah elemen. dari konteks kode, elemen memiliki class hide yang di beri properti display none di css. jadi memiliki arti remove hide elemen.
    resultContainer.classList.add('hide');          //add class hide ke variabel/elemen sehingga container result tidak ditampilkan
    setNextQuestion();                              //panggil fungsi
}

//buat fungsi setNextQuestion
function setNextQuestion() {
    resetState();                                       //panggil fungsi
    showQuestion(questions[currentQuestionIndex]);      //panggil fungsi dengan parameter(question[index])
}
// ambil array question, akses object answer. kemudian buat perulangan sejumlah properti milik answer
//buat fungsi untuk menampilkan question
function showQuestion(question) {                           //buat fungsi dengan argumen question
    questionContainer.innerText = question.question;        //mengambil properti question dari object milik array question, kemudian ditampilkan dengan innerHTML sebagai text di elemen questionContainer
    question.answers.forEach(answer => {                    //akses properti answers milik array dari question, kemudian lakukan perulangan untuk setiap answers dan masukkan ke answer
        const button = document.createElement('button');    //inisiasi dengan membuat elemen button
        button.innerText = answer.text;                     //atur text pada button dengan answer yang di akses oleh perulangan for each
        button.classList.add('btn');                        //tambahkan class btn ke button
        if (answer.correct) {                               //jika properti answer correct / bernilai true. karena nilai dari answer merupakan bilangan boelan
            button.dataset.correct =  answer.correct;       //button.dataset.correct merupakan cara menyimpan data custom pada html menggunakan atribut 'data-*, disini nilai true dari answer.correct disimpan di atribut 'data-correct' pada tombol button
        }
        button.addEventListener('click', selectAnswer);     //buat event listener click untuk button untuk memanggil fungsi
        answerButtons.appendChild(button);                  //jadikan button sebagai child answerButton
    });
}   

// buat fungsi untuk reset
function resetState() {                         //deklarasi fungsi
    while (answerButtons.firstChild) {          //buat perulangan while. dengan kondisi untuk mengecek apakah child pertama dari answerButtons ada / tidak, jika ada maka true & kondisi akan dilanjutkan
        answerButtons.removeChild(answerButtons.firstChild);    //menghapus setiap child dari answerButton.
    }
}

//buat fungsi select answer
function selectAnswer(e) {                      //buat fungsi dengan argumen e
    const selectedButton = e.target;            //inisiasi dengan mentargetkan variabel e *menetapkan elemen tombol yang di klik oleh pengguna kedalam variabel
    selectedButton.classList.toggle('checked'); //beri button dengan class tanda checked

    const checkedButtons = document.querySelectorAll('.checked');       
    const correctAnswers = questions[currentQuestionIndex].answers.filter(answer => answer.correct);
    const isCorrect =  Array.from(checkedButtons).every(button => button.dataset.correct === 'true')
        && correctAnswers.length === checkedButtons.length;
    if(isCorrect) {
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {                  //buat percabangan jika index dari question kurang dari panjang question -1
        nextButton.classList.remove('hide');                            //hapus class hide tombol next / tampilkan tombol next
    } else {                                                            //sebaliknya
        showResult();                                                   //panggil fungsi
    }
}

// buat fungsi showResult   
function showResult() {                             
    //menambahkan class hide ke beberapa komponen, agar komponen tersebut disembunyikan dokumen
    quizContainer.classList.add('hide');
    questionContainer.classList.add('hide');
    answerButtons.classList.add('hide');
    nextButton.classList.add('hide');
    resultContainer.classList.remove('hide');
    //tampilkan score dengan menggunakan innerHTML + string
    scoreText.innerText = `Kamu menjawab dengan benar ${score} dari ${questions.length} pertanyaan.`;
}

//buat fungsi restart untuk meremove class hide untuk beberapa elemen, agar tampil seperti saat awal
function restartQuiz() {
    quizContainer.classList.remove('hide');                 
    questionContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    startQuiz();
}

//summon startQuiz
startQuiz();

