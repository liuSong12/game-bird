/**
 * 
 * @param {boolean} flag true:删除图片 false:创建图片 
 * @param {string} src 图片地址
 * @param {Function} fn 点击图片的回调函数
 * @returns 
 */
function createImg(flag = true, src, fn) {
    let div = document.querySelector('.img-container');
    if (flag) {
        div && div.remove();
        return;
    }
    div = document.createElement('div');
    div.classList.add('img-container');
    div.style.position = 'fixed';
    div.style.left = '0px';
    div.style.top = '0px';
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.background = `rgba(0,0,0,.5)`;
    div.style.zIndex = '99';

    const img = document.createElement('img');
    img.src = src;
    img.style.width = '320px';
    img.style.position = 'absolute';
    img.style.left = '50%';
    img.style.top = '50%';
    img.style.transform = 'translate(-50%,-50%)';
    img.classList.add('img');

    const text = document.createElement('p');
    text.innerText = '空格跳跃，左右方向键移动,enter暂停/开始';
    text.style.color = '#fff';
    text.style.position = 'absolute';
    text.style.fontSize = '20px';

    div.appendChild(text);

    div.appendChild(img);
    document.body.appendChild(div);
    img.onload = () => {
        text.style.left = img.offsetLeft - img.offsetWidth / 2 + 'px'
        text.style.top = img.offsetTop + img.offsetHeight / 3 + 'px'
    }


    img.onclick = function () {
        fn();
        div.remove();
    }

}

export default createImg;