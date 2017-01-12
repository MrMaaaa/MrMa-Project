/**
 * Created by hasee on 2016/9/18 0018.
 */

$(function() {
    //导航栏天气预报

    //天气显示问题

    $('#header .weather_question').click(function() {
        var $info = $('#header .question_info');
        if ($info.css('display') == 'none') {
            $info.slideDown();
        } else {
            $info.slideUp();
        }
    });

    $('#header .question_info .close').click(function() {
        $('#header .question_info').slideUp();
    });

    //天气显示问题 end

    /*if (navigator.appVersion.indexOf('Trident') != -1 || navigator.appVersion.indexOf('Edge') != -1) {
        //IE/Edge浏览器访问
        return;
    }*/

    $.ajax({
        url: 'http://wthrcdn.etouch.cn/weather_mini?',
        data: {
            city: remote_ip_info.city
        },
        dataType: 'json',
        success: function(data) {
            $('#weather_info').html(data.data.city + '&nbsp;' + data.data.forecast[0].low + '&nbsp;' + data.data.forecast[0].high);
        },
        error: function() {
            console.log('Can not find the weather data, please try again soon.');
        }
    });

    //导航栏天气预报 end

});
