var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
var w = myCanvas.width;
var h = myCanvas.height;
var lastPos = {};
// 入口函数
function init() {
    var img = new Image();
    var random = Math.random();
    if(random < 0.1) {
        img.src = './img/jiang.jpg';
    }else {
        img.src = './img/ku.jpg';
    }

    img.onload = function () {
        myCanvas.style.backgroundImage = 'url('+ img.src +')';
        // 鼠标按下
        myCanvas.addEventListener('mousedown', downFun);

    }


    ctx.beginPath();
    ctx.fillStyle = '#aaa';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-out';
}
init();
// 点击按下时
function downFun(e) {
    lastPos.x =  e.clientX - myCanvas.offsetLeft;
    lastPos.y = e.clientY - myCanvas.offsetTop;
    
    ctx.beginPath();
    ctx.arc(lastPos.x, lastPos.y, 20, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();

    myCanvas.addEventListener('mousemove', moveFun);
    document.body.addEventListener('mouseup', upFun);
    
}
// 鼠标按下移动时
function moveFun(e) {
    var x = e.clientX - myCanvas.offsetLeft;
    var y = e.clientY - myCanvas.offsetTop;
    
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    
    lastPos.x = x;
    lastPos.y = y;
    
}
// 鼠标抬起时
function upFun() {
    myCanvas.removeEventListener('mousemove', moveFun);
    document.body.removeEventListener('mouseup', upFun);
    clearCover();
}
function clearCover() {
    var imageData = ctx.getImageData(0, 0, w, h);
    var sum = 0;
    for(var i = 0; i < imageData.data.length; i+=4) {
        if(imageData.data[i] == 0) {
            sum++;
        }  
    }
    if(sum  > w*h*0.7) {
        ctx.clearRect(0, 0, w, h);
    }
}
