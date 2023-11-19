import config from "../config";
import Block from "./Block";


class Role extends Block {
    constructor(ctx, img, imgStartX, imgStartY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight, speedX, speedY, imgs) {
        super(ctx, img, imgStartX, imgStartY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight, speedX, speedY);
        this.imgs = imgs;
        this.yg = 2500;
        this.xg = 2000;
        this.xDifference = 350;

        this.maxY = window.innerHeight - config.PLANE_MAXWIDTH * config.PLANE_ROW - this.canvasWidth;
        this.swingStatus = 2;
        this.timer = null;
    }
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.img = this.imgs[this.swingStatus % 3];
            this.render();
            this.swingStatus++;
        }, 200);
    }
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null
    }

    move(duration) {
        super.move(duration); //this.canvasY += this.speedY * duration;
        this.speedY += this.yg * duration;

        //水平方向的速度不一样
        if (this.speedX > 0) {
            this.speedX -= this.xg * duration;
        } else {
            this.speedX += this.xg * duration;
        }
    }
    onMove() {
        if (this.speedY < -1000) {
            this.speedY = -1000;
        }
        if (this.canvasY > this.maxY) {
            this.canvasY = this.maxY;
            this.speedY = 0;
        }
        if (this.canvasY < 0) {
            this.canvasY = 0;
            this.speedY = 0;
        }
        if (this.canvasX < 0) {
            this.xg = 0;
            this.canvasX = 0;
            this.speedX = 0;
        }
        if (this.canvasX > window.innerWidth - this.canvasWidth) {
            this.xg = 0;
            this.canvasX = window.innerWidth - this.canvasWidth;
            this.speedX = 0;
        }
    }
    /**
     * 
     * @param {boolean} flag true:向右 false:向左 
     */
    leftAndRight(flag) {
        if (Math.abs(this.speedX) > 700) return;
        if (flag) {
            //向右
            this.speedX += this.xDifference;
        } else {
            //向左
            this.speedX -= this.xDifference;
        }
    }

    jump() {
        this.speedY -= 800;
    }
}

export default Role;