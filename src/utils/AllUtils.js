
class Util {
    /**
     * 
     * @description 获取随机数
     * @param {int} min 
     * @param {int} max 
     * @returns 返回min到max之间的随机数
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    /**
     * @description: 检测碰撞,rec包含x,y,width,height
     * @param {*} rec1 
     * @param {*} rec2 
     * @returns true 碰撞 false 没碰撞
     */
    isHit(rec1, rec2) {
        const x1 = rec1.x + rec1.width / 2;
        const y1 = rec1.y + rec1.height / 2;
        const x2 = rec2.x + rec2.width / 2;
        const y2 = rec2.y + rec2.height / 2;
        const disX = Math.abs(x1 - x2);
        const disY = Math.abs(y1 - y2);
        if ((disX < (rec1.width + rec2.width) / 2 ) && (disY < (rec1.height + rec2.height) / 2 )) {
            return true;
        }
        return false;
    }
    /**
     * @description 获取图片对象
     * @param {string} src 
     * @returns  返回图片对象
     */
    getImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                resolve(image);
            }
        })
    }
}


export default new Util();