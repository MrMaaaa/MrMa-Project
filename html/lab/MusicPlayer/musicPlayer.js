(function(window) {
    var _emp = window.emp;
    window._easyMusicPlayer = {
        assetUrl: '', //音乐资源路径
        assetNames: ['Annabelle', 'CanonRock', 'Fade', 'FreeLoop', 'Summertrain'], //歌曲名列表
        _audio: null, //获取audio DOM对象
        $audio: null, //获取audio jQuery对象
        progressRun: null, //进度条运动定时器
        totalTime: 0, //获取总长度
        $nowMusic: null, //当前正在播放的列表
        sumMusic: null, //列表音乐总数
        $play: null, //播放
        $pause: null, //暂停
        $prev: null, //前一首
        $next: null //后一首
    };

    //时间格式转换
    _easyMusicPlayer.transToTime = function(musicLength) {
        //将audio的歌曲总时长转为时间格式00:00
        var musicLen = musicLength;
        var length = parseInt(Number(musicLen)); //总秒数取整
        var min = parseInt(length / 60); //计算剩余分钟数
        var sec = length - min * 60; //计算剩余秒数

        //如果分钟不到10补0占位
        min = min < 10 ? '0' + min : min;

        //如果秒数不到10补0占位
        sec = sec < 10 ? '0' + sec : sec;

        return min + ':' + sec; //返回时间格式的字符串
    };

    //获取音乐地址
    _easyMusicPlayer.getMusicUrl = function(musicName) {
        return this.assetUrl + musicName;
    };

    //音乐切换
    _easyMusicPlayer.change = function() {
        //停止当前滚动条
        var that = this;
        clearInterval(that.progressRun);

        //滚动条回到初始位置
        $('#_progressBar').animate({
            'left': 0
        }, 500);
        $('#_progressLine').animate({
            'width': 0
        }, 500);

        //音乐切换
        that.$nowMusic = $('#_musicLists .active');
        that.$audio.attr('src', that.getMusicUrl(that.$nowMusic.text() + '.mp3'));
        that._audio.ondurationchange = function() {
            //获取当前播放歌曲总长度
            that.totalTime = that._audio.duration;
            //修改显示总时间为当前歌曲的总时长
            $('#_ttlTime').text(that.transToTime(that.totalTime));
        }

        //修改显示名称
        $('#_musicName').text(that.$nowMusic.text());

        //初始化当前时常
        $('#_nowTime').text(that.transToTime(0));

        //修改图标
        if (that.$pause.css('display') === 'none') {
            that.$pause.show();
            that.$play.hide();
        }

        //播放
        that._audio.play();
    };

    //播放
    _easyMusicPlayer.play = function(event) {
        var that = this;
        var evt = event || window.event;
        evt.stopPropagation();
        that.$play.hide();
        that.$pause.show();

        //修改为当前歌曲的总时长
        $('#_ttlTime').text(that.transToTime(that.totalTime));
        //初始化当前时常
        $('#_nowTime').text(that.transToTime(that._audio.currentTime));

        //开始播放
        that._audio.play();
    };

    //暂停
    _easyMusicPlayer.pause = function(event) {
        var that = this;
        var evt = event || window.event;
        evt.stopPropagation();

        //切换为播放按钮
        that.$pause.hide();
        that.$play.show();

        //暂停播放
        that._audio.pause();
    };

    //上/下一曲
    _easyMusicPlayer.swicth = function(event, type) {
        //type: 0表示上一曲，1表示下一曲
        var that = this;
        var evt = event || window.event;
        evt.stopPropagation();

        var swicthType = type;

        switch (swicthType) {
            case 0:
                //修改audio路径为上一首歌
                if (that.$nowMusic.index() != 0) {
                    //如果当前不是第一首歌
                    that.$nowMusic.removeClass('active').prev().addClass('active');
                } else {
                    //如果是第一首歌
                    that.$nowMusic.removeClass('active');
                    $('#_musicLists ._musicLi:last-child').addClass('active');
                }

                break;
            case 1:
                //修改audio路径为下一首歌
                if (that.$nowMusic.index() != that.sumMusic - 1) {
                    //如果当前不是最后一首歌
                    that.$nowMusic.removeClass('active').next().addClass('active');
                } else {
                    //如果是最后一首歌
                    that.$nowMusic.removeClass('active');
                    $('#_musicLists ._musicLi:first-child').addClass('active');
                }

                break;
            default:
                throw 'undefined swicth type';
                break;
        }

        that.change();
    };

    //控制进度条
    _easyMusicPlayer.progressCtrl = function(event, progressObj) {
        var that = this;
        var evt = event || window.event;
        evt.stopPropagation();

        var progressDom = progressObj[0];

        //当点击进度条时，切换到点击位置播放

        //获取点击进度条的横坐标
        var mouseX = evt.clientX - progressDom.getBoundingClientRect().left * (progressDom.getBoundingClientRect().width / progressDom.getBoundingClientRect().width);

        //将滚动条移动到点击位置
        that._audio.currentTime = parseInt(that.totalTime * parseFloat(mouseX / progressDom.getBoundingClientRect().width));

        //初始化当前时常
        $('#_nowTime').text(that.transToTime(that._audio.currentTime));

        //切换为暂停按钮
        that.$play.hide();
        that.$pause.show();

        //开始播放
        that._audio.play();
    };

    //初始化
    _easyMusicPlayer.init = function(musicUrl, musicNames) {
        var that = this;
        //初始化

        //获取资源地址
        that.assetUrl = musicUrl;

        //根据输入的歌曲名拼合html元素
        that.assetNames = musicNames;

        //播放器头
        var musicPrev = '<div id="_musicCtrl"><span id="_musicName">Annabelle</span><div class="_time"><span id="_nowTime">00:00</span>/<span id="_ttlTime">00:00</span></div><span id="_progress"><i class="iconfont" id="_progressBar"></i><i id="_progressLine"></i></span><div class="ctrlGroup"><i class="iconfont icon-shangyiqu" id="_prev"></i><i class="iconfont icon-bofang" id="_play"></i><i class="iconfont icon-zanting" id="_pause"></i><i class="iconfont icon-xiayiqu" id="_next"></i></div></div><div id="_musicLists"><ul>';

        //播放器歌曲名
        var musicLists = '<li class="_musicLi active"><a href="javascript: void(null)">' + that.assetNames[0] + '</a></li>';

        //循环插入歌曲名
        for (var i = 1; i < that.assetNames.length; i++) {
            musicLists += '<li class="_musicLi"><a href="javascript: void(null)">' + that.assetNames[i] + '</a></li>';
        }

        //播放器尾
        var musicNext = '</ul></div><audio id="_musicAudio" src=""></audio>';

        //完整播放器html元素
        var musicBody = musicPrev + musicLists + musicNext;
        $('#_musicPlayer').append(musicBody);

        that._audio = $('#_musicAudio')[0]; //获取audio DOM对象
        that.$audio = $('#_musicAudio'); //获取audio jQuery对象
        that.progressRun = null; //进度条运动定时器
        that.totalTime = 0; //获取总长度
        that.$nowMusic = $('#_musicLists .active'); //当前正在播放的列表
        that.sumMusic = $('#_musicLists ._musicLi').length; //列表音乐总数
        that.$play = $('#_play'); //播放
        that.$pause = $('#_pause'); //暂停
        that.$prev = $('#_prev'); //前一首
        that.$next = $('#_next'); //后一首

        //默认播放第一首歌
        that.$audio.attr('src', that.assetUrl + that.$nowMusic.text() + '.mp3');
        $('#_musicName').text(that.$nowMusic.text());
        //当资源加载就绪时获取歌曲总时长并显示
        that._audio.ondurationchange = function() {
            that.totalTime = that._audio.duration;
            $('#_ttlTime').text(that.transToTime(that.totalTime));
        }
    };

    //主函数
    _easyMusicPlayer.start = function(musicUrl, musicNames) {
        var that = this;

        //初始化，插入播放器html，设置属性值
        //参数为音乐资源地址，音乐名数组
        that.init(musicUrl, musicNames);

        that.$play.click(function(e) {
            that.play(e);
        });

        that.$pause.click(function(e) {
            that.pause(e);
        });

        that.$prev.click(function(e) {
            that.swicth(e, 0);
        });

        that.$next.click(function(e) {
            that.swicth(e, 1);
        });

        $('#_musicLists ._musicLi').click(function() {
            //当点击歌曲列表时，如果点击的不是正在播放的歌曲就切换到点击歌曲，否则重新播放该歌曲
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings().removeClass('active');
            }

            that.change();
        });

        $('#_progress').click(function(e) {
            that.progressCtrl(e, $('#_progress'));
        });

        that.$audio
            .on('play', function(e) {
                //监听播放属性
                var evt = e || window.event;
                evt.stopPropagation();
                var ai = 0; //执行滚动条滚动间隔

                //进度条开始运动
                that.progressRun = setInterval(function() {
                    //实时获取当前播放时刻
                    var now = that._audio.currentTime;

                    //每十毫秒改变一次滚动条
                    $('#_progressBar').css({
                        'left': parseInt(now / that.totalTime * 100) + '%'
                    });
                    $('#_progressLine').css({
                        'width': parseInt(now / that.totalTime * 100) + '%'
                    });

                    if (ai / 100 === 1) {
                        //每秒钟刷新当前播放歌曲时间
                        $('#_nowTime').text(that.transToTime(now));
                        if (ai === 100) {
                            ai = 0;
                        }
                    }
                    ai++;
                }, 10);
            })
            .on('pause', function(e) {
                //监听暂停属性
                var evt = e || window.event;
                evt.stopPropagation();

                //停止进度条
                clearInterval(that.progressRun);
            })
            .on('ended', function(e) {
                //监听播放结束属性
                var evt = e || window.event;
                evt.stopPropagation();

                //修改audio路径为下一首歌
                if (that.$nowMusic.index() != that.sumMusic - 1) {
                    //如果当前不是最后一首歌
                    that.$nowMusic.removeClass('active').next().addClass('active');
                } else {
                    //如果是最后一首歌
                    that.$nowMusic.removeClass('active');
                    $('#_musicLists ._musicLi:first-child').addClass('active');
                }

                that.change();
            });
    };

    //避免缩写全局变量冲突，使用原始名称
    _easyMusicPlayer.noConflict = function(name) {
        //恢复该全局变量
        window.emp = _emp;

        //使用者自定义简写名称
        if(name) {
            window[name] = _easyMusicPlayer;
            return name;
        }
        return _easyMusicPlayer;
    };

    window.emp = _easyMusicPlayer;
})(window);