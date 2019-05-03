var index = 0,
    num = 5,
    itemWidth = 520,
    timer = undefined;
    timerFunc();
function move (diraction) {
    clearInterval(timer);
    $('.img-box').stop(false, true);
    if (diraction == 'prev') {
        index --;
        if (index < 0) {
            $('.img-box').css({
                left : num * -itemWidth
            });
            index = 4;
        }
    }else if (diraction == 'next') {
        index ++;
        if (index > num) {
            $ ('.img-box').css({
                left : 0
            });
            index = 1;
        }
    }
    $('.img-box').animate({
        left: index * -itemWidth 
    },function () {
        timerFunc();
    });
    active($('.item').eq(index == 5 ? 0 : index));
}
function timerFunc() {
    timer = setTimeout(function () {
        move('next')
    },3000)
}
function active (dom) {
    $('.active').removeClass('active');
    dom.addClass('active');
}
$('.prevBtn').click(function () {
    move('prev');
})
$('.nextBtn').click(function () {
    move('next');
})
$('.item').click(function () {
    index = $(this).index();
    move('');
})