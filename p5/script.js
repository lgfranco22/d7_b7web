/* initial data */
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let lineW = 5;
let typeLine = 'round'; // round, bevel, miter
updateLineW();

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d'); // contexto 2d

/* events */

/*
Passo a passo para desenhar no canvas:
- Quando o clique do mouse for pressionado, ative o modo desenho.
- Quando o mouse se mover, se o modo desenho estiver ativado, desenhe.
- Quando o clique do mouse for solto, desative o modo desenho.
*/

document.querySelector('.down').addEventListener('click', download);

document.querySelector('#ma').addEventListener('click', maCursor);
document.querySelector('#me').addEventListener('click', meCursor);

document.querySelectorAll('.colorArea .color').forEach(item=>{
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

/* functions */
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    // console.log(color);
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    // console.log('afundou o mouse');
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    // console.log('movendo o mouse');
    if(canDraw) {
        // console.log('desenhando...');
        // console.log('X:'+e.pageX+' Y:'+e.pageY);
        draw(e.pageX, e.pageY);
        // pointX = e.pageX - screen.offsetLeft;
        // pointY = e.pageY - screen.offsetTop;
        // console.log('X:'+pointX+' Y:'+pointY);

    }
}

function mouseUpEvent() {
    // console.log('levantou o mouse');
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // desenhar
    ctx.beginPath();
    ctx.lineWidth = lineW;
    ctx.lineJoin = typeLine; // round, bevel, miter
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    // salvar posicao atual no mouseX
    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    lineW = 5;
    updateLineW();
}

function maCursor(){
    if(lineW < 50){
        lineW++;
    }
    updateLineW();
}

function meCursor(){
    
    if(lineW > 5){
        lineW--;
    }
    
    updateLineW();
}

function updateLineW() {
    if(lineW <= 9 && lineW !== '05'){
        lineW = '0'+lineW;
    }
    document.querySelector('#info').innerHTML = lineW;
}

function download(){
    let nome = prompt('Digite um nome para o arquivo');
    if(nome === null){
        nome = 'imagem';
    }
    var link = document.createElement('a');
    link.download = nome+'.png';
    link.href = document.getElementById('tela').toDataURL()
    link.click();
}