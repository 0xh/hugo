var oUl = document.getElementsByTagName('ul')[0];
var oLi = document.getElementsByTagName('li');
var len = oLi.length;
window.onload = function () {
    oUl.className = "init";
}
// 鼠标进入li
for (var i = 0; i < len; i ++) {
    oLi[i].onmouseenter = function (e) {
        var dir = getDirection(e, this);
        var oContent = this.getElementsByClassName('content')[0];
        oContent.className = 'content';
        switch(dir){
            case 0:
                oContent.classList.add('in-bottom');
                break;
            case 1:
                oContent.classList.add('in-left');
                break;
            case 2:
                oContent.classList.add('in-top');
                break;
            case 3:
                oContent.classList.add('in-right');
                break;
        }
    }
    // console.log(oli[0]);
    // 鼠标移出li
    oLi[i].onmouseleave = function (e) {
        var dir = getDirection(e, this);
        var oContent = this.getElementsByClassName('content')[0];
        oContent.className = 'content';
        switch(dir){
            case 0:
                oContent.classList.add('out-bottom');
                break;
            case 1:
                oContent.classList.add('out-left');
                break;
            case 2:
                oContent.classList.add('out-top');
                break;
            case 3:
                oContent.classList.add('out-right');
                break;
        }
    }
}
// 函数
function getDirection(e, ele) {
    var w = ele.offsetWidth;
    var h = ele.offsetHeight;
    var x = (e.offsetX - w / 2) * (w > h ? h / w : 1);
    var y = (e.offsetY - h / 2) * (h > w ? w / h : 1);
    var d = (Math.round((Math.atan2(y, x) * (180 / Math.PI) + 360) / 90) + 3) % 4;
    return d;
}