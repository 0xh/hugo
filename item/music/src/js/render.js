import $ from "jquery";
    

window.onload = function (){
    renderTime();
}
function renderImg(img){
    $(".img-wrapper img").attr("src", img);
}
function renderAudio(music){
    $("#audio").attr("src",music);
}
function renderInfo(data){
    const html = `
            <h3 class="song-name">${data.song}</h3>
            <h4 class="singer-name">${data.singer}</h4>
            <h4 class="album-name">${data.album}</h4>
    `;
    $(".song-info").html(html);
}
function conversion (time){
    var sec = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60) : parseInt(time % 60);
    var min = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
    return min + ':' + sec;
}
function renderTime(){
    var duration = $('#audio')[0].duration;
    // var currentTime = $('#audio')[0].currentTime;
    $('.cur-timer').html(conversion(0));
    $('.all-timer').html(conversion(duration));
}

function renderLike(isLike){
    if(isLike){
        $(".like-btn").addClass("liked");
    }else{
        $(".like-btn").removeClass("liked");
    }
}

export default (data) =>{
    renderImg(data.image);
    renderAudio(data.audio);
    renderInfo(data);
    renderLike(data.isLike);
    
}