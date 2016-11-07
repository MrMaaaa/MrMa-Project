/**
 * Created by hasee on 2016/9/18 0018.
 */

//导航栏天气预报
$(function() {
	if(navigator.appVersion.indexOf('.NET') != -1 && navigator.appVersion.indexOf('Chrome') == -1)
    {
        //禁止IE浏览器访问n
        $('body').hide();
        alert('不支持IE/Edge浏览器及所有IE内核浏览器，请使用Chrome或FireFox浏览（尝试切换高速/急速模式刷新页面）。');
    }


	$.ajax({
		url: 'http://wthrcdn.etouch.cn/weather_mini?city=烟台',
		dataType: 'json',
		success: function(data) {
			$('#weather_info').html(data.data.city + '&nbsp;' + data.data.forecast[0].low + '&nbsp;' + data.data.forecast[0].high);

		},
		error: function() {
			console.log('Can not find the weather data, please try again soon.');
		}
	});

	//导航栏天气预报 end

	//天气显示问题

	$('#header .weather_question').click(function() {
        if($('#header .question_info').css('display') == 'none') {
            $('#header .question_info').slideDown();
        }
		else {
            $('#header .question_info').slideUp();
        }
	});

	$('#header .question_info .close').click(function() {
		$('#header .question_info').slideUp();
	});
});

//天气显示问题 end
