//根据访问网站设备载入不同样式文件
var mobile_list = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],//移动端设备
    userAgent = navigator.userAgent,//浏览器信息

    link_section = document.createElement('link'),//主页面section样式
    link_section_href = 'css/section_style.css',//文件路径

    link_index = document.createElement('link'),//主页面样式
    link_index_href = 'css/index.css';//主页面样式文件路径

link_section.setAttribute('rel', 'stylesheet');//通用属性设置
link_section.setAttribute('type', 'text/css');//通用属性设置
link_index.setAttribute('rel', 'stylesheet');//通用属性设置
link_index.setAttribute('type', 'text/css');//通用属性设置

//根据浏览器信息判断设备类型
for(var i = 0; i < mobile_list.length; i++)
{
    if(userAgent.indexOf(mobile_list[i]) != -1) {
        link_section_href = 'css/section_style_mobile.css';
        link_index_href = 'css/index_mobile.css';
        break;
    }
}

link_section.setAttribute('href', link_section_href);//设置相应的样式文件
link_index.setAttribute('href', link_index_href);//设置相应的样式文件

document.getElementsByTagName('head')[0].appendChild(link_section);//将样式文件插入head标签中
document.getElementsByTagName('head')[0].appendChild(link_index);//将样式文件插入head标签中