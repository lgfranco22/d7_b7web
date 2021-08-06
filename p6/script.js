// initial data
let currentQuestion = 0;
let correctAnswers = 0;

setName();
showQuestion();

// events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];
        // console.log(q.question);

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        // document.querySelector('.options').innerHTML = '';

        // for(let i in q.options) {
        //     document.querySelector('.options').innerHTML += `<div>${q.options[i]}</div>`;
        // }

        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent);
        });


    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    // console.log('clico em: '+e.target.getAttribute('data-op'));
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        // console.log('acerto miseravi');
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion(); 
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);
    
    $.post(
        "processa.php", 
        {
            nome: nome, 
            pontos: points 
        }
    );

    //.done((data)=>{
    //});

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = `Tá ruim hein ${nome}?!`;
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = `Muito bom ${nome}!`;
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = `Parabéns ${nome}!`;
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}
    
function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    nome = '';
    showQuestion();
    setName();
}

function setName() {
    document.querySelector('.progress--bar').style.width = '0%';
    nome = prompt("Digite seu nome: ");
}