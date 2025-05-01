import Canvas from './render.js';

const startBtn = document.getElementById('startBtn');
startBtn.onclick = startGame();


function startGame(){
    const gameCanvas = new Canvas(600,800);
    gameCanvas.drawRect('black',100,100,100,100);
};

