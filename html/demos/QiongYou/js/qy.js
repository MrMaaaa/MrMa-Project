/**
 * Created by hasee on 2016/9/3 0003.
 */
'use strict';

var bg_img = document.getElementsByClassName('bg_img');//图片组
var bg_imgs = document.getElementsByClassName('bg_imgs')[0];//图片容器div

//轮播图片自适应窗口大小
var pageWidth = document.body.clientWidth;
function autoResize()
{
    if(document.body.clientWidth >= 1200)
    {
        pageWidth = document.body.clientWidth;
        for(var i = 0; i < bg_img.length; i++)
        {
            bg_img[i].style.width = pageWidth + 'px';
            bg_img[i].style.height = pageWidth / 3 + 'px';
        }
        bg_imgs.style.height = pageWidth / 3 + 'px';
    }

    else if(document.body.clientWidth <= 640)
    {
        $('.right_fixed').css('display', 'none');
    }
}
autoResize();
window.onresize = function()
{
    autoResize();
};
//轮播图片自适应窗口大小  end

//图片轮播
(function()
{
    var left_arr = document.getElementsByClassName('left_arr')[0];
    var right_arr = document.getElementsByClassName('right_arr')[0];
    var total = 5;//图片总数
    var nowNum = 1;//当前显示图片序号
    $('.bg_img' + nowNum).css('z-index', '0');
    var beforeNum = total;//上一张图片编号
    left_arr.onclick = function()
    {
        beforeNum = nowNum;
        nowNum--;
        if(nowNum == 0)
        {
            nowNum = total;
        }
        $('.bg_img' + beforeNum).css('z-index', '-1');//这里改为-2将导致背景图片切换为其他图片，不是上一张，因此需要过渡设置为-1
        var nowImg = $('.bg_img' + nowNum);
        nowImg.css('left', -pageWidth);//将当前图片放到窗口右侧
        nowImg.css('z-index', '0');
        nowImg.animate({left: 0}, 1000, function()
            {
                $('.bg_img' + beforeNum).css('z-index', '-2');
            }
        );
    };
    right_arr.onclick = function()
    {
        beforeNum = nowNum;
        nowNum++;
        if(nowNum == (total + 1))
        {
            nowNum = 1;
        }
        $('.bg_img' + beforeNum).css('z-index', '-1');
        var nowImg = $('.bg_img' + nowNum);
        nowImg.css('left', pageWidth);
        nowImg.css('z-index', '0');
        nowImg.animate({left: 0}, 1000, function()
            {
                $('.bg_img' + beforeNum).css('z-index', '-2');
            }
        );
    };
})();
//图片轮播  end

//搜索框切换
(function()
{
    var beforeCon = document.getElementsByClassName('search_content1')[0];
    var nowCon;
    var contents = document.getElementsByClassName('search_li');
    var arrow = $('.up_arr');
    for(var i = 0; i < contents.length; i++)
    {
        contents[i].onclick = function()
        {
            var nowNum = this.classList[1].substr(9, 11);
            nowCon = document.getElementsByClassName('search_content' + nowNum)[0];
            if(beforeCon != nowCon)
            {
                arrow.animate({left: (nowNum - 1) * 25 + 12.5 + '%'}, 300);
                beforeCon.style.display = 'none';
                nowCon.style.display = 'block';
                beforeCon = nowCon;
            }
        }
    }
})();
//搜索框切换  end

//折扣界面切换
(function()
{
    var slides = document.getElementsByClassName('discount_slide');
    var
        i = 0,
        beforeNum = 1,
        nowNum = 1;
    for(; i < slides.length; i++)
    {
        slides[i].onmouseover = function()
        {
            nowNum = this.classList[1].substr(14, 2);
            if(beforeNum != nowNum)
            {
                this.style.background = '#fff';
                document.getElementsByClassName('discount_slide' + beforeNum)[0].style.background = 'transparent';
                document.getElementsByClassName('list' + nowNum)[0].style.display = 'block';
                document.getElementsByClassName('list' + beforeNum)[0].style.display = 'none';
                beforeNum = nowNum;
            }
        };
    }
})();
//折扣界面切换  end

//游记界面切换

(function()
{
    var
        slides = document.getElementsByClassName('travel_slide'),
        i = 0,
        beforeNum = 1,
        nowNum = 1;

    for(; i < slides.length; i++)
    {
        slides[i].onmouseover = function()
        {
            nowNum = this.classList[1].substr(12, 2);
            if(beforeNum != nowNum)
            {
                this.style.background = '#1ab05f';
                document.getElementsByClassName('travel_slide' + beforeNum)[0].style.background = '#d7d7d7';
                document.getElementsByClassName('t_list' + nowNum)[0].style.display = 'block';
                document.getElementsByClassName('t_list' + beforeNum)[0].style.display = 'none';
                beforeNum = nowNum;
            }
        };
    }
})();

//游记界面切换  end

//底部登录关闭

$('.bottom_closed').click(function()
    {
        $('.bottom_fixed').fadeOut('slow');
    }
);

//底部登录关闭  end

//意见反馈显示与隐藏

$('.aside').click(function()
    {
        var $right = $('.right_fixed');

        function leftArr()
        {
            $('.aside').css('backgroundPosition', '0 0');
        }

        function rightArr()
        {
            $('.aside').css('backgroundPosition', '-29px 0');
        }

        if(parseInt($right.css('right')) == 0)
        {
            $right.animate({right: '-245px', 'speed': 'fast', callback: leftArr()});
        }
        else
        {
            $right.animate({right: '0', 'speed': 'fast', callback: rightArr()});
        }

    }
);

$(document).scroll(function()
    {
        if($(document).scrollTop() < 360)
            $('.right_fixed').fadeOut();
        else
            $('.right_fixed').fadeIn();
    }
);

//意见反馈显示与隐藏  end