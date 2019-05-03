var tabs = document.getElementById("tabs").getElementsByTagName("li");
var lists = document.getElementById("lists").getElementsByTagName("ul");
for(var i = 0; i < tabs.length; i++){
	tabs[i].onclick = showlist;
}

function showlist(){
	for(var i = 0; i < tabs.length; i++){
		if (tabs[i] === this){
			tabs[i].className = "active";
			lists[i].className = "clearfix active";
		}
		else{
			tabs[i].className = "";
			lists[i].className = "clearfix";
	}
	}
}

// 倒计时
window.endtime = new Date()
	var endtime =new Date("2019/05/10 18:00:00");//定义最终时间
	var time = document.getElementById("time");
	setInterval(autoplay,1000);
	function autoplay(){
		var date = new Date();
		var ms = endtime.getTime() - date.getTime();//累计毫秒差
		var s =parseInt(ms/1000) < 10 ? '0' + parseInt(ms/1000) : parseInt(ms/1000);//累计秒差
		//s/3600得到小时数，小时数/24等于天数（注意取整）
		var day = parseInt(s / 3600 / 24) < 10 ? '0' + parseInt(s / 3600 / 24) : parseInt(s / 3600 / 24);
		//取余24得到不够一天的小时数
		var hour = parseInt( s / 3600 % 24) < 10 ? '0' + parseInt( s / 3600 %24) : parseInt( s / 3600 %24);
		//累计分数取余不够一小时的分数
		var minute = parseInt( s / 60 %60) < 10 ? '0' +parseInt( s / 60 %60) : parseInt( s / 60 %60);
		//累计取余60得到的是不够一分钟的那些秒数
		var second = parseInt( s % 60) < 10 ? '0' + parseInt( s % 60) : parseInt( s % 60);
		time.innerHTML = "距开始"+day+"："+hour+"："+minute+"："+second
	}
//固定菜单栏
var seckillNav = document.getElementById("seckillNav");
window.onscroll = function(){
	var scrollTop = document.documentElement.scrollTop || window.pageYoffset || document.body.scrollTop || 0;

	if (scrollTop >= 260) {
		seckillNav.className = "seckill-nav seckill-navfixed";
	}else{
		seckillNav.className = "seckill-nav";
	}
}