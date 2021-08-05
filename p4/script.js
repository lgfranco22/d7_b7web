/* inital data */



let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let warning = '';
let playing = false;

reset();





/* events */
document.querySelector(".reset").addEventListener('click', reset);

// opção a

// document.querySelector('div[data-item=a1]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=a2]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=a3]').addEventListener('click', itemClick);

// document.querySelector('div[data-item=b1]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=b2]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=b3]').addEventListener('click', itemClick);

// document.querySelector('div[data-item=c1]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=c2]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=c3]').addEventListener('click', itemClick);

// opção b
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});





/* functions */
function itemClick(event) {
    // console.log(event.target);
    let item = event.target.getAttribute('data-item');
    // console.log(item);
    if(playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        tooglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    
    // if(random === 0) {
    //     player = 'x';
    // }
    // else {
    //     player = 'o';
    // }


    /* 
    dica: no javascript, é possivel acessar um objeto
    de duas formas. 
    
    1a: square.a1;
    2a: square['a1'];
    */

    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        // console.log('ITEM: ', i);
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function tooglePlayer() {

    player = (player === 'x') ? 'o' : 'x';
 
    // if(player === 'x'){
    //     player = 'o';
    // } else{
    //     player = 'x';
    // }

    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(','); // a1, a2, a3
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true;
}