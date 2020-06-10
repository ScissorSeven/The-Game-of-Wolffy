$(function(){
	$(".rules").click(function(){
		$(".rule").stop().fadeIn(100);
	});
	$(".close").click(function(){
		$(".rule").stop().fadeOut(100);
	});
	$(".start").click(function(){
		$(this).stop().fadeOut(100);
		//调用处理进度条方法
		progress();
		//灰太狼动画开始
		wolfanimate();
	});
	$(".reStart").click(function(){
		$(".mask").stop().fadeOut(100);
		//调用处理进度条方法,刷新进度条重新开始
		progress();
		wolfanimate();
	});
	
	//进度条减少方法
	function progress(){
		$(".progress").css({
			width:180
		});
		var timer=setInterval(function(){
			var progressWidth=$(".progress").width();
			progressWidth-=3;
			$(".progress").css({
				width:progressWidth
			});
			//监听进度条走完
			if(progressWidth<=0){
				clearInterval(timer);
				$(".mask").stop().fadeIn(100);
				stopwolfanimate();
			}
			
		},1000)
	}
	
	//灰太狼动画
	function wolfanimate(){
		// 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['img/h0.png','img/h1.png','img/h2.png','img/h3.png','img/h4.png','img/h5.png','img/h6.png','img/h7.png','img/h8.png','img/h9.png'];
        var wolf_2=['img/x0.png','img/x1.png','img/x2.png','img/x3.png','img/x4.png','img/x5.png','img/x6.png','img/x7.png','img/x8.png','img/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
		// 3.创建一个图片
        var $wolfImage = $("<img src='' class='wolfImage'>");
        // 随机获取图片的位置
        var posIndex = Math.ceil(Math.random() * 8);
        // 4.设置图片显示的位置
        $wolfImage.css({
           position: "absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        // 随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
		 // 5.设置图片的内容
		 //设为全局变量
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
		var wolfIndex=0;
        wolfTimer = setInterval(function () {
            if(wolfIndex > wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                wolfanimate();
            }
            $wolfImage.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        }, 130);
		// 6.将图片添加到界面上
        $(".container").append($wolfImage);
		
		 // 7.调用处理游戏规则的方法
        gameRules($wolfImage);
	}
	//停止灰太狼动画
	function stopwolfanimate(){
		$(".wolfImage").remove();
		clearInterval(wolfTimer);
		$(".score").text(0);
	}
	//游戏逻辑
	 function gameRules($wolfImage) {
		 //事件只执行一次
        $wolfImage.one("click",function () {
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            // 拿到当前点击图片的地址
            var $src = $(this).attr("src");
            // 根据图片地址判断是否是灰太狼
            var flag = $src.indexOf("h") >= 0;
            // 根据点击的图片类型增减分数
            if(flag){
                // +10
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                // -10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }
	
})