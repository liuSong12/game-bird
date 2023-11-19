import config from "./config";
import Util from "@/utils/AllUtils"

import Plane from "./allclass/Plane";
import Obstacle from "./allclass/Obstacles";
import Role from "./allclass/Role"

import createImg from './componets/Img'

import wallPng from "@/assets/wall.png"
import role1Png from "@/assets/1.png"
import role2Png from "@/assets/2.png"
import role3Png from "@/assets/3.png"
import startPng  from "@/assets/start.png"
import overPng  from "@/assets/gameover.png"

const wallSpeedX = config.PLANE_AND_OBSTACLE_SPEED_x;

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.plane = [] //平面
        this.obstacle = [] //障碍物对象
        this.obstacleRec = [] //障碍物方块
        this.role = null //角色
        this.timer = null
        this.tick = 16
        this.AllplaneWidth = null //平面总宽度
        this.isGameOver = false
        this.init()
    }
    async init() {
        this.wallPng = await Util.getImage(wallPng);
        this.rolePng3 = await Util.getImage(role3Png);
        this.rolePng2 = await Util.getImage(role2Png);
        this.rolePng1 = await Util.getImage(role1Png);
        this.roleImgs = [this.rolePng1, this.rolePng2, this.rolePng3];
        this.initPlan();
        this.initObstacle();
        this.initRole();
        this.initEvent();
        createImg(false, startPng, () => {
            this.start();
        })
    }

    initEvent() {
        document.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'ArrowUp') {
                this.timer && this.role.jump();
            }
        })
        document.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                if (this.timer) {
                    createImg(false, startPng)
                    this.stop();
                } else {
                    if(this.isGameOver){
                        location.reload();
                    }else{
                        createImg(true)
                        this.start();
                    }
                }
            }
        })
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') {
                this.role.leftAndRight(false);
            }else if(e.key === 'ArrowRight'){
                this.role.leftAndRight(true);
            }
        })
    }

    planeMove(duration) {
        // 平面移动处理
        for (let index = 0; index < this.plane.length; index++) {
            this.plane[index].move(duration);
            if (this.plane[index].canvasX < -this.plane[index].canvasWidth) {
                this.plane[index].canvasX = this.AllplaneWidth
            }
        }
    }

    obstacleMove(duration) {
        // 障碍物移动处理
        for (let index = 0; index < this.obstacle.length; index++) {
            this.obstacle[index].move(duration);
            if (this.obstacle[index].canvasX < -this.obstacle[index].canvasWidth - 100) {
                this.obstacle.splice(index, 1);
            }
        }

        let lastX = 0; //最后一个障碍物对象的 x + 宽度
        let lastIndex = 0; // 最后一个障碍物对象的索引
        let firstX = 0; // 第一个障碍物对象的x + 宽度
        let firstIndex = 0; // 第一个障碍物对象的索引
        this.obstacle.forEach((item, index) => {
            if (item.canvasX + item.canvasWidth > lastX) {
                lastX = item.canvasX + item.canvasWidth;
                lastIndex = index;
            }
            if (item.canvasX < firstX) {
                firstX = item.canvasX + item.canvasWidth;
                firstIndex = index;
            }
        })

        let lastObstacle = this.obstacle[lastIndex]; //最后一个障碍物对象
        let firstObstacle = this.obstacle[firstIndex]; //第一个障碍物对象

        if (lastObstacle.canvasX + lastObstacle.canvasWidth < window.innerWidth) {
            this.initObstacle();
        }
    }
    roleMove(duration) {
        this.role.move(duration);
        let isHit = false;
        let rec1 = this.role.getRec();
        for (let index = 0; index < this.obstacle.length; index++) {
            isHit = Util.isHit(rec1, this.obstacle[index].getRec());
            if (isHit === true) {
                break;
            }
        }
        if (isHit) {
            this.isGameOver = true;
            createImg(false,overPng,()=>{
                location.reload();
            })
            this.stop();
        }
    }

    start() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            const duration = this.tick / 1000
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            this.planeMove(duration);
            this.obstacleMove(duration);
            this.roleMove(duration);

        }, this.tick)
        this.role.startSwing();
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.role.stopSwing();
    }

    initRole() {
        const image = this.rolePng1;
        const imgW = config.PLANE_MAXWIDTH
        const imgH = image.height / image.width * imgW;
        const startY = window.innerHeight - imgH * config.PLANE_ROW - imgH;
        const role = new Role(this.ctx, this.rolePng1, 0, 0, image.width, image.height, 0, startY, imgW, imgH, 0, 0, this.roleImgs);
        this.role = role;
    }

    initObstacle() {
        const image = this.wallPng;
        const imgW = config.PLANE_MAXWIDTH
        const imgH = image.height / image.width * imgW;
        // 生成多少个障碍物
        const num = Util.getRandomInt(2, 4);
        const distanceY = config.OBSTACLE_PLANE_DISTANCE;

        this.obstacleRec.length = 0
        let newCreate = 0
        while (newCreate < num) {
            const len = Util.getRandomInt(1, 3); // 每个障碍物的长度
            let x = Util.getRandomInt(window.innerWidth, window.innerWidth * 2);
            let y = Util.getRandomInt(distanceY, window.innerHeight - imgH * config.PLANE_ROW - distanceY);

            let rec1 = { x, y, width: imgW * len, height: imgH / 2 };
            let isHit = false;

            for (let index = 0; index < this.obstacleRec.length; index++) {
                let rec2 = this.obstacleRec[index];
                if (Util.isHit(rec1, rec2)) {
                    isHit = true;
                    break;
                }
            }
            if (!isHit) {
                for (let j = 0; j < len; j++) {
                    let obstacleItem = new Obstacle(this.ctx, image, 0, 0, image.width, image.height / 2, x + imgW * j, y, imgW, imgH, wallSpeedX, 0);
                    this.obstacle.push(obstacleItem);
                    if (j == len - 1) {
                        rec1.obstacle = obstacleItem;
                    }
                }
                newCreate++;
                this.obstacleRec.push(rec1);
            }
        }

    }


    initPlan() {
        let image = this.wallPng;
        const imgW = config.PLANE_MAXWIDTH
        const imgH = image.height / image.width * imgW;
        const col = Math.ceil(window.innerWidth / imgW) + 1;
        const startY = window.innerHeight - imgH * config.PLANE_ROW;
        this.AllplaneWidth = (col - 1) * imgW;

        for (let index = 0; index < col; index++) {
            let plane = new Plane(this.ctx, image, 0, 0, image.width, image.height, index * imgW, startY, imgW, imgH, wallSpeedX, 0);
            let plane2 = new Plane(this.ctx, image, 0, 0, image.width, image.height, index * imgW, startY + imgH, imgW, imgH, wallSpeedX, 0);
            this.plane.push(plane, plane2);
        }
    }
}



export default Game;