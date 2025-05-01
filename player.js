import gameCanvas from './main.js';

export default class Player {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.color = 'purple';
        this.width = 20;
        this.height = 40;
    };

    movePlayer(event){
        if(event.key === 'w'){
            this.y += 10;
        }
        else if(event.key === 's'){
            this.y -= 10;
        }
        else if(event.key === 'd'){
            this.x += 10;
        }
        else if(event.key === 'a'){
            this.x -=10
        }
        gameCanvas.draw(this.color, this.x, this.y, this. width, this.height);
    }
}