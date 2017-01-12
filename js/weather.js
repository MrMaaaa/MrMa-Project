/**
 * Created by hasee on 2016/9/19 0019.
 */

//城市切换

$(function() {
    $('.container .head .slide_btn').click(function() {
        var $weatherMain = $('.container .weather_main');
        $weatherMain.css('display') !== 'block' ? $(this).val('关闭列表') : $(this).val('选择城市');

        $weatherMain.slideToggle('fast');
    });

    var
        before_sel_li = $('.sel_li10'),
        now_sel_li,
        before_sel_city = $('.sel_li10_list'),
        now_sel_city,
        city = '';
    $('.sel_li').each(function() {
        $(this).mouseover(function() //鼠标移动到左侧面板修改对应样式及右侧内容
            {
                var now_sel_li = $(this);
                var nowName = now_sel_li.get(0).classList[1];
                var beforeName = before_sel_li.get(0).classList[1];
                if (beforeName != nowName) {
                    before_sel_li.removeClass('active');
                    $('#' + beforeName + '_list').hide();
                    now_sel_li.addClass('active');
                    $('#' + nowName + '_list').show();

                    before_sel_li = now_sel_li;
                }
            });
    });

    $('.city_name').each(function() //给当前被选中的城市添加样式
        {
            $(this).click(function() {
                now_sel_city = $(this);
                if (before_sel_city != now_sel_city) {
                    now_sel_city.addClass('active');
                    if (before_sel_city) {
                        before_sel_city.removeClass('active');
                    }
                    before_sel_city = now_sel_city;
                }

                city = now_sel_city.text();
                $('#selected_city').html('<strong>' + now_sel_city.text() + '</strong>天气情况：');

                $.ajax({
                    url: 'http://wthrcdn.etouch.cn/weather_mini',
                    dataType: 'json',
                    data: {
                        city: city
                    },
                    success: function(data) {
                        if (data.status == 1000) {
                            var str = '';

                            //未来天气情况
                            for (var i = 1; i < data.data.forecast.length; i++) {
                                str += data.data.forecast[i].date + data.data.forecast[i].low.substr(2, 5) + ' ~ ' + data.data.forecast[i].high.substr(2, 5) + '<br>';
                            }

                            $('#city_weather').html('天气情况：' + data.data.ganmao + '<br>温度：' + data.data.forecast[0].low.substr(2, 5) + ' ~ ' + data.data.forecast[0].high.substr(2, 5) +
                                '<br><br>未来天气情况：<br>' + str);
                        } else if (data.status == 1002) {
                            $('#city_weather').html('天气显示异常');
                        }

                        //收起城市列表，更改按钮文字
                        $('.container .weather_main').slideToggle('fast');
                        $('.container .head .slide_btn').val('选择城市');
                    },
                    error: function() {
                        console.log('Can not find the weather data, please try again soon.');
                    }
                });
            });
        });

    //显示访问者城市的天气情况
    //选中访问者城市
    $('.city_list .sel_li_list .city_name').each(function() {
        if ($(this).text() === remote_ip_info.city) {
            $(this).addClass('active');
        }
    });

    //修改显示城市
    $('#selected_city').html('<strong>' + remote_ip_info.city + '</strong>天气情况：');

    //获取天气信息
    $.ajax({
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        dataType: 'json',
        data: {
            city: $('#default_city').text()
        },
        success: function(data) {
            if (data.status == 1000) {
                var str = '';
                //
                for (var i = 1; i < data.data.forecast.length; i++) {
                    str += data.data.forecast[i].date + data.data.forecast[i].low.substr(2, 5) + ' ~ ' + data.data.forecast[i].high.substr(2, 5) + '<br>';
                }

                $('#city_weather').
                html('天气情况：' + data.data.ganmao + '<br>温度：' + data.data.forecast[0].low.substr(2, 5) + ' ~ ' + data.data.forecast[0].high.substr(2, 5) +
                    '<br><br>未来天气情况：<br>' + str
                );
            } else if (data.status == 1002) {
                $('#city_weather').html('天气显示异常');
            }
        },
        error: function() {
            console.log('Can not find the weather data, please try again soon.');
        }
    });

});

//城市切换 end
