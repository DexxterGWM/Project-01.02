const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

function call() {
    if(document.getElementById('span')) { document.getElementById('span').innerHTML = '' }
}

var btn = document.querySelector("button");

btn.addEventListener("mouseover", function() {
  this.textContent = "Select";
})

btn.addEventListener("mouseout", function() {
  this.textContent = "Submit";
})

submitBtn.addEventListener('click', () => {
    const answer = getSelected()

    if(answer) {
        loadQuiz()

        document.getElementById('submit').style.display = 'none';
        let btn = document.createElement('button')

        if(answer === quizData[currentQuiz].correct) {
            btn.innerHTML = 'Correct'
            btn.style.backgroundColor = 'green'

            score++
            const check = document.querySelectorAll('.answer')

            for (let i = 0; i < check.length; i++) {
                if (check[i] == document.getElementById(`${answer}`)) {
                    check[i].checked = true
                    document.getElementById(`${answer}_text`).style.color = 'green'
                }
            }
        } else {
            btn.innerHTML = 'Incorrect'
            btn.style.backgroundColor = 'red'

            const check = document.querySelectorAll('.answer')

            for (let i = 0; i < check.length; i++) {
                if (check[i] == document.getElementById(`${answer}`)) {
                    check[i].checked = true
                    document.getElementById(`${answer}_text`).style.color = 'red'
                }
            }
        }

        document.getElementById('quiz').appendChild(btn)
        currentQuiz++

        if(currentQuiz < quizData.length) {
            function Btn() {
                btn.addEventListener('click', () => {
                    btn.style.display = 'none'
                    loadQuiz()
                    
                    document.getElementById('submit').style.display = 'block';
                    document.getElementById(`${answer}_text`).style.color = 'black'
                })
            }

            Btn()
        } else {
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
            `

            function button() {
                var btn = document.querySelector("button");

                btn.addEventListener("mouseover", function() {
                    this.style.backgroundColor = '#4d4d4d';
                })

                btn.addEventListener("mouseout", function() {
                    this.style.backgroundColor = 'black';
                })
            }
            button()
        }
    } else {
        loadQuiz()
        document.getElementById('question').innerHTML += `
            <br>
            <span id='span' style="color: red; font-size: 0.9rem;">
                No option selected...
            </span>
        `
    }
})