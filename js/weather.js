/**
 * Created by hasee on 2016/9/19 0019.
 */

//城市切换

(function()
{
	var
		before_sel_li = $('.sel_li10'),
		now_sel_li,
		before_sel_city = $('.sel_li10_list'),
		now_sel_city,
		city = '';
	$('.sel_li').each(function()
	{
		$(this).mouseover(function()//鼠标移动到左侧面板修改对应样式及右侧内容
		{
			now_sel_li = $(this);
			var nowName = now_sel_li.get(0).classList[1];
			var beforeName = before_sel_li.get(0).classList[1];
			if(beforeName != nowName)
			{
				before_sel_li.css('background', '#cde9ee');
				before_sel_li.css('color', '#000');
				$('#' + beforeName + '_list').css('display', 'none');

				now_sel_li.css('background', '#3ac0ff');
				now_sel_li.css('color', '#fff');
				$('#' + nowName + '_list').css('display', 'block');

				before_sel_li = now_sel_li;
			}
		});
	});

	$('.city_name').each(function()//给当前被选中的城市添加样式
	{
		$(this).click(function()
		{
			now_sel_city = $(this);
			if(before_sel_city != now_sel_city)
			{
				now_sel_city.css('background', '#01b1ff');
				now_sel_city.css('color', '#fff');
				if(before_sel_city)
				{
					before_sel_city.css('background', '#ddd');
					before_sel_city.css('color', '#000');
				}
				before_sel_city = now_sel_city;
			}

			city = now_sel_city.text();
			$('#selected_city').html('<strong>' + now_sel_city.text() + '</strong>天气情况：');

			$.ajax
			({
				url: 'http://wthrcdn.etouch.cn/weather_mini',
				dataType: 'json',
				data:
				{
					city: city
				},
				success: function(data)
				{
					if(data.status == 1000)
					{
						var str = '';
						//
						for(var i = 1; i < data.data.forecast.length; i++)
						{
							str += data.data.forecast[i].date + data.data.forecast[i].low.substr(2, 5) + ' ~ ' + data.data.forecast[i].high.substr(2, 5) + '<br>';
						}

						$('#city_weather').html('天气情况：' + data.data.ganmao + '<br>温度：' + data.data.forecast[0].low.substr(2, 5) + ' ~ ' + data.data.forecast[0].high.substr(2, 5) +
							'<br><br>未来天气情况：<br>' + str);
					}
					else if(data.status == 1002)
					{
						$('#city_weather').html('天气显示异常');
					}
				},
				error: function()
				{
					console.log('Can not find the weather data, please try again soon.');
				}
			});

		});
	});

    $('#default_city').click();

})();

//城市切换 end