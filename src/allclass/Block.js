class Block {
    /**
     * @param {*} ctx 画布对象
     * @param {*} img 图片对象
     * @param {*} imgStartX 从图片的x位置开始截取
     * @param {*} imgStartY 从图片的y位置开始截取
     * @param {*} imgWidth  截取的宽度
     * @param {*} imgHeight  截取的高度
     * @param {*} canvasX  从画布的x位置开始画
     * @param {*} canvasY  从画布的y位置开始画
     * @param {*} canvasWidth  图片在画布上的宽度
     * @param {*} canvasHeight  图片在画布上的高度
     */
    constructor(ctx, img, imgStartX, imgStartY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight, speedX = 0, speedY = 0) {
        this.ctx = ctx;
        this.img = img;
        this.imgStartX = imgStartX;
        this.imgStartY = imgStartY;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.speedX = speedX;
        this.speedY = speedY;
        this.render()
    }

    render() {
        this.ctx.drawImage(this.img, this.imgStartX, this.imgStartY, this.imgWidth, this.imgHeight, this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight);
    }

    move(duration) {
        this.canvasX += this.speedX * duration;
        this.canvasY += this.speedY * duration;
        if (this.onMove) {
            this.onMove();
        }
        this.render();
    }

    getRec() {
        return {
            x: this.canvasX,
            y: this.canvasY,
            width: this.canvasWidth,
            height: this.canvasHeight
        }
    }

}

export default Block;