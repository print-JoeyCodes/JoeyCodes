import Canvas from './render.js';
import Player from './player.js';

export const gameCanvas = new Canvas();
export const player = new Player(10, 10);

const startBtn = document.getElementById('startBtn');
startBtn.onclick = startGame();


function startGame(){
    window.addEventListener('keydown', player.movePlayer());
};

