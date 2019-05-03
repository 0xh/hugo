
import $ from "jquery";
import render from "./render";
var allWidth = 239;
var timer;
var rotate;


function event (data) { 
    let index = 0;
    let len = data.length;
    function conversion (time){
        var sec = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60) : parseInt(time % 60);
        var min = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
        return min + ':' + sec;
    }  
    function movePro(){
        var duration = $('#audio')[0].duration;
        var currentTime = $('#audio')[0].currentTime;
        $('.cur-timer').html(conversion(currentTime));
        $('.pro-top').css('width', currentTime/duration * allWidth + 4 + 'px');
    }
    //musicPlay
    function musicPlay(){
        $('#audio')[0].play();
        $('.play-btn').addClass('playing');
        timer = setInterval(movePro, 200); 
        $('.img-wrapper').addClass('rotating');
    }
    function musicPause(){
        $('#audio')[0].pause();
        $('.play-btn').removeClass('playing');
        clearInterval(timer);
        $('.img-wrapper').removeClass('rotating');
        
    }
    $(".play-btn").on("click",()=>{
        if($("#audio")[0].paused){
            musicPlay();
        }else{
            musicPause();
        }
    })
    function song(num) {
        musicPause();
        index += num;
        if(index > len-1) {
            index = 0;
        }else if (index < 0){
            index = len - 1;
        }
        render(data[index]);
        musicPlay();
    }
    $(".pro-btn").on("click", ()=>{
        song(-1);
    })
    $(".next-btn").on("click",()=>{
        song(1);
    })
    

}
export default event