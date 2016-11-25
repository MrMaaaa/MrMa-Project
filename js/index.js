$('#header').load('./header.html');
$('#footer').load('./footer.html');
$(function() {
    console.log('%c能到这里的，都是同道中人(￣︶￣)↗', 'color: #EF476F;');
    console.log('%c嘿，如果你是一个正在寻求前端工程师的HR，快来与我取得联系吧~', 'color: #EF476F;');
    console.log('%c联系方式：tenfyma@foxmail.com', 'color: #EF476F;');

    if($('head link').eq(3).attr('href').indexOf('mobile') == -1) {
        //pc端
        $('.tab_li > a').click(function() { //点击四个板块名称时
            if ($(this).parent().width() != $(window).width()) {
            //如果此时处于全屏状态
                $('.title .icon-fanhui').show(); //显示返回图标
                $('body > header').css('backgroundColor', $(this).parent().css('backgroundColor')); //更改header背景色为当前版块颜色
                $('.title').css('height', 'auto'); //板块父标签高度设为默认

                $(this).parent().animate({
                    width: '100%',
                    height: '150px',
                    lineHeight: '150px',
                    marginTop: '50px'
                }, 300, 'swing', function() {
                    $('.content .content_lists .content_li').eq($(this).index()).show(); //内容父标签显示，板块对应内容显示
                }).siblings().animate({
                    width: 0,
                    height: 0
                }, 300, 'swing'); //将其他版块隐藏（宽高为0）点击版块宽度100%，固定高度
            }
        });

        $('.icon-fanhui').click(function() { //点击返回按钮时
            $('.tab_li').animate({
                width: '25%',
                height: '100%',
                lineHeight: '10em',
                marginTop: '0'
            }); //四个板块恢复默认格式
            $(this).hide(); //隐藏返回按钮

            $('body > header').css('backgroundColor', 'rgba(0, 0, 0, .5)'); //将header颜色恢复默认

            $('.title').css('height', '100%'); //板块父标签高度恢复

            $('.content .content_lists .content_li').hide(); //内容隐藏
        });
    }
    else {
        // mobile端
        $('.tab_li').click(function() {
            // 点击板块时
            $(this).siblings().animate({height: 0}, 300, 'swing');
            $(this).animate({height: '150px', lineHeight: '150px'}, 300, 'swing', function() {
                $('.icon-fanhui').show();

                $('.content .content_lists .content_li').eq($(this).index()).show(); //内容父标签显示，板块对应内容显示
            });

            $('.title').css('height', 'auto');//父元素高度自动

            $('body > header').slideUp();//隐藏天气
        });

        $('.icon-fanhui').click(function() {
            $(this).hide();//隐藏返回按钮
            $('.tab_li').animate({height: '25%'}, 300, 'swing');//板块恢复默认排列
            $('.title').css('height', '100%');//父元素高度恢复100%
            $('.tab_li .li_icon').show();
            $('.content .content_lists .content_li').hide(); //内容隐藏
            $('body > header').slideDown();//显示天气
        });
    }
});
