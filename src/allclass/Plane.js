import Block from "./Block";

class Plane extends Block {
    constructor(ctx, img, imgStartX, imgStartY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight,speedX,speedY) {
        super(ctx, img, imgStartX, imgStartY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight,speedX,speedY);
    }
}


export default Plane;