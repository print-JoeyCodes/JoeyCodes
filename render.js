export default class Canvas {
    constructor(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    drawRect(fillStyle,x,y,width,height){
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillRect(x,y,width,height)
    }
}