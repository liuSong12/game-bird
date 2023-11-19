import Block from "./Block";

class Obstacle extends Block{
    constructor(ctx,img,imgStartX,imgStartY,imgWidth,imgHeight,canvasX,canvasY,canvasWidth,canvasHeight,speedX,speedY){
        super(ctx,img,imgStartX,imgStartY,imgWidth,imgHeight,canvasX,canvasY,canvasWidth,canvasHeight,speedX,speedY);
    }
}

export default Obstacle;