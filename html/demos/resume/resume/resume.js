/**
 * Created by hasee on 2016/10/12 0012.
 */


$(window).ready(function()
{
    var
        $mainT = $('#main_tree'),
        $leaf1 = $('#leaf1'),
        $leaf2 = $('#leaf2'),
        $leaf3 = $('#leaf3'),
        $leaf4 = $('#leaf4'),
        $leaf5 = $('#leaf5');

    //时间轴移动
    function tree_animate()
    {
        var t = window.requestAnimationFrame(tree_animate);

        $mainT.css('height', $mainT.height() + 5);

        if($mainT.height() === 100)
        {
            $leaf1.children('.tree_root').show();
            $leaf1.children('.tree_line').animate({width: '100%'}, 400, 'linear',function()
            {
                $leaf1.children('.content').fadeIn(400);
            });
            $leaf1.children('.year').show();

        }

        if($mainT.height() === 350)
        {
            $leaf2.children('.tree_root').show();
            $leaf2.children('.tree_line').animate({width: '100%'}, 600, 'linear',function()
            {
                $leaf2.children('.content').fadeIn(600);
            });
            $leaf2.children('.year').show();
        }

        if($mainT.height() === 450)
        {
            $leaf3.children('.tree_root').show();
            $leaf3.children('.tree_line').animate({width: '100%'}, 600, 'linear',function()
            {
                $leaf3.children('.content').fadeIn(600);
            });
            $leaf3.children('.year').show();
        }

        if($mainT.height() === 550)
        {
            $leaf4.children('.tree_root').show();
            $leaf4.children('.tree_line').animate({width: '100%'}, 600, 'linear',function()
            {
                $leaf4.children('.content').fadeIn(600);
            });
            $leaf4.children('.year').show();
        }

        if($mainT.height() === 650)
        {
            $leaf5.children('.tree_root').show();
            $leaf5.children('.tree_line').animate({width: '100%'}, 600, 'linear',function()
            {
                $leaf5.children('.content').fadeIn(600);
            });
            $leaf5.children('.year').show();
        }

        if($mainT.height() === $mainT.parent().height())
        {
            window.cancelAnimationFrame(t);
        }
    }
    tree_animate();

    //锚链接&点击高亮
    var moving = false;//防止滚动检测与点击出现冲突
    $('.nav_li').click(function()
    {
        moving = true;
        $(this).siblings().children().css({'background': '#247ba0','color': '#fff'});
        $(this).children().css({'background': '#fff','color': '#247ba0'});
        $('html, body').animate({scrollTop: parseInt($(this).index()) * 1200 + 'px'}, 700, function(){  moving = false;  });
    });

    //检测滚动条位置高亮对应标题
    $(window).scroll(function()
    {
        if(!moving)
        {
            var scrollHeight = $(document).scrollTop();

            if(scrollHeight >= 0 && scrollHeight < 1200)
            {
                $('.nav_li:nth-child(1) a').css({'background': '#fff','color': '#247ba0'}).parent().siblings().children().css({'background': '#247ba0','color': '#fff'});
            }
            else if(scrollHeight >= 1200 && scrollHeight < 2400)
            {
                $('.nav_li:nth-child(2) a').css({'background': '#fff','color': '#247ba0'}).parent().siblings().children().css({'background': '#247ba0','color': '#fff'});
            }
            else if(scrollHeight >= 2400 && scrollHeight < 3600)
            {
                $('.nav_li:nth-child(3) a').css({'background': '#fff','color': '#247ba0'}).parent().siblings().children().css({'background': '#247ba0','color': '#fff'});
            }
        }
    });
});