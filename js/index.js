/**
 * Created by hasee on 2016/9/18 0018.
 */

//导航栏天气预报


			$.ajax
			({
					url: 'http://wthrcdn.etouch.cn/weather_mini?city=烟台',
					dataType: 'json',
					success: function(data)
					{
						$('#weather_info').html(data.data.city + '&nbsp;' + data.data.forecast[0].low + '&nbsp;' + data.data.forecast[0].high);

					},
					error: function()
					{
						console.log('Can not find the weather data, please try again soon.');
					}
			});

//导航栏天气预报 end
