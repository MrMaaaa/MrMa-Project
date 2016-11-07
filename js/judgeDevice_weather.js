//根据访问设备载入响应css文件
var mobile_list = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],//移动端设备
    userAgent = navigator.userAgent,//浏览器信息
    css_weather = document.createElement('link'),//创建link标签
    css_weather_href = '../css/weather.css';//默认pc端样式

css_weather.setAttribute('rel', 'stylesheet');//通用属性设置
css_weather.setAttribute('type', 'text/css');//通用属性设置

for(var i = 0; i < mobile_list.length; i++)
{
    if(userAgent.indexOf(mobile_list[i]) != -1) {
        css_weather_href = '../css/weather_mobile.css';
        break;
    }
}

css_weather.setAttribute('href', css_weather_href);

document.getElementsByTagName('head')[0].appendChild(css_weather);