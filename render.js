export default class Canvas {
    constructor(width, height){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = width;
        this.height = this.canvas.heigh = height;
    }

    drawRect(fillStyle,x,y,width,height){
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillRect(x,y,width,height)
    }
}