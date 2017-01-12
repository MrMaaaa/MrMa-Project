$.ajaxSetup({
    cache: false
});

$(function() {
    console.log('%c能到这里的，都是同道中人(￣︶￣)↗', 'color: #EF476F;');
    console.log('%c嘿，如果你是一个正在寻求前端工程师的HR，快来与我取得联系吧~', 'color: #EF476F;');
    console.log('%c联系方式：tenfyma@foxmail.com', 'color: #EF476F;');

    var mobile_list = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], //移动端设备
        userAgent = navigator.userAgent, //浏览器信息
        isPC = true;

    //根据浏览器信息判断设备类型
    for (var i = 0; i < mobile_list.length; i++) {
        if (userAgent.indexOf(mobile_list[i]) != -1) {
            isPC = false;
            console.log('你正在使用' + mobile_list[i] + '端访问本网页');
            break;
        }
    }

    if(isPC) {
        console.log('你正在使用PC端访问本页面');
    }

    var winWidth = $(window).width(); //当前屏幕宽度

    //当屏幕宽度改变
    $(window).resize(function() {
        winWidth = $(window).width();
        $('.tab_li').removeClass('return-p').removeClass('return-m');
        if (winWidth >= '768') {
            /*$('.tab_li').css({
                width: '25%',
                height: '100%',
                lineHeight: '10em',
                marginTop: '0'
            });*/
        } else {
            /*$('.tab_li').css({
                width: '100%',
                height: '25%'
            });*/
        }
    });

    $('.tab_li > a').click(function() {
        //点击四个板块名称时
        $('.tab_li .li_icon').hide();
        if (winWidth >= '768') {
            if ($(this).parent().width() != winWidth) {
                //如果此时处于全屏状态
                $('.title .icon-fanhui').show(); //显示返回图标
                $('body > header').css('backgroundColor', $(this).parent().css('backgroundColor')); //更改header背景色为当前版块颜色
                $('.title').css('height', 'auto'); //板块父标签高度设为默认

                $('.tab_li').removeClass('return-p'); //去除返回效果类

                //给当前选中的元素加上效果显示类，其他相邻元素加上效果隐藏类
                $(this).parent().addClass('animate-p-show').siblings().addClass('animate-p-hide');

                $('.content .content_lists .content_li').eq($(this).parent().index()).show().siblings().hide(); //内容父标签显示，板块对应内容显示
                //将其他版块隐藏（宽高为0）点击版块宽度100%，固定高度
            }
        } else {
            $('.icon-fanhui').show();

            $('.content .content_lists .content_li').eq($(this).parent().index()).show(); //内容父标签显示，板块对应内容显示

            $('.tab_li').removeClass('return-m'); //去除返回效果类

            $(this).parent().addClass('animate-m-show').siblings().addClass('animate-m-hide');

            $('.title').css('height', 'auto'); //父元素高度自动

            $('body > header').slideUp(); //隐藏天气
        }
    });

    $('.icon-fanhui').click(function() {
        //点击返回按钮时
        $('.tab_li .li_icon').show();
        if (winWidth >= '768') {
            /*$('.tab_li').animate({
                width: '25%',
                height: '100%',
                lineHeight: '10em',
                marginTop: '0'
            }); //四个板块恢复默认格式*/
            $('.tab_li').removeClass('animate-p-show').removeClass('animate-p-hide').addClass('return-p');
            $(this).hide(); //隐藏返回按钮

            $('body > header').css('backgroundColor', 'rgba(0, 0, 0, .5)'); //将header颜色恢复默认

            $('.title').css('height', '100%'); //板块父标签高度恢复

            $('.content .content_lists .content_li').hide(); //内容隐藏
        } else {
            $(this).hide(); //隐藏返回按钮
            $('.tab_li').removeClass('animate-m-show').removeClass('animate-m-hide').addClass('return-m'); //板块恢复默认排列
            $('.title').css('height', '100%'); //父元素高度恢复100%
            $('.tab_li .li_icon').show();
            $('.content .content_lists .content_li').hide(); //内容隐藏
            $('body > header').slideDown(); //显示天气
        }
    });

    /*$('.tab_li').css({
        width: '25%',
        height: '100%',
        lineHeight: '10em',
        marginTop: '0'
    });

    $('.tab_li').css({
        width: '100%',
        height: '25%'
    });*/
});
