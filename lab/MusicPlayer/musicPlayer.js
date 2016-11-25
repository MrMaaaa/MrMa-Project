var musicUrl = './asset/music/';

$(function() {
    var _musicObj = {
        _audio: $('#_musicAudio')[0], //获取audio DOM对象
        $audio: $('#_musicAudio'), //获取audio jQuery对象
        progressRun: null, //进度条运动定时器
        totalTime: '', //获取总长度
        preUrl: musicUrl, //音乐路径
        $nowMusic: $('#_musicLists .active'), //当前正在播放的列表
        sumMusic: $('#_musicLists ._musicLi').length, //列表音乐总数
        $play: $('#_play'), //播放
        $pause: $('#_pause'), //暂停
        $prev: $('#_prev'), //前一首
        $next: $('#_next'), //后一首

        transToTime: function(data) {
            //将audio的歌曲总时长转为时间格式00:00
            var min = 0; //分钟
            var sec = 0; //秒数
            var length = parseInt(Number(data)); //总秒数取整
            min = parseInt(length / 60); //计算剩余分钟数
            sec = length - min * 60; //计算剩余秒数

            //如果分钟不到10补0占位
            min = min < 10 ? '0' + min : min;

            //如果秒数不到10补0占位
            sec = sec < 10 ? '0' + sec : sec;

            return min + ':' + sec; //返回时间格式的字符串
        },

        getMusicUrl: function(musicName) {
            return _musicObj.preUrl + musicName;
        },

        changePlay: function() {
            //停止当前滚动条
            clearInterval(_musicObj.progressRun);

            //滚动条回到初始位置
            $('#_progressBar').animate({
                'left': 0
            }, 500);
            $('#_progressLine').animate({
                'width': 0
            }, 500);

            //音乐切换
            _musicObj.$nowMusic = $('#_musicLists .active');
            _musicObj.$audio.attr('src', _musicObj.getMusicUrl(_musicObj.$nowMusic.text() + '.mp3'));
            _musicObj._audio.ondurationchange = function() {
                //获取当前播放歌曲总长度
                _musicObj.totalTime = _musicObj._audio.duration;
                //修改显示总时间为当前歌曲的总时长
                $('#_ttlTime').text(_musicObj.transToTime(_musicObj.totalTime));
            }

            //修改显示名称
            $('#_musicName').text(_musicObj.$nowMusic.text());

            //初始化当前时常
            $('#_nowTime').text(_musicObj.transToTime(0));

            //修改图标
            if (_musicObj.$pause.css('display') === 'none') {
                _musicObj.$pause.show();
                _musicObj.$play.hide();
            }

            //播放
            _musicObj._audio.play();

        }
    };

    //默认播放第一首歌
    _musicObj.$audio.attr('src', _musicObj.preUrl + _musicObj.$nowMusic.text() + '.mp3');
    $('#_musicName').text(_musicObj.$nowMusic.text());
    _musicObj._audio.ondurationchange = function() {
        _musicObj.totalTime = _musicObj._audio.duration;
    }

    _musicObj.$play.click(function(e) {
        e.stopPropagation();
        //切换为暂停按钮
        $(this).hide();
        _musicObj.$pause.show();

        //修改为当前歌曲的总时长
        $('#_ttlTime').text(_musicObj.transToTime(_musicObj.totalTime));
        //初始化当前时常
        $('#_nowTime').text(_musicObj.transToTime(_musicObj._audio.currentTime));

        //开始播放
        _musicObj._audio.play();
    });

    _musicObj.$pause.click(function(e) {
        e.stopPropagation();

        //切换为播放按钮
        $(this).hide();
        _musicObj.$play.show();

        //暂停播放
        _musicObj._audio.pause();
    });

    _musicObj.$prev.click(function(e) {
        e.stopPropagation();

        //修改audio路径为上一首歌
        if (_musicObj.$nowMusic.index() != 0) {
            //如果当前不是第一首歌
            _musicObj.$nowMusic.removeClass('active').prev().addClass('active');
        } else {
            //如果是第一首歌
            _musicObj.$nowMusic.removeClass('active');
            $('#_musicLists ._musicLi:last-child').addClass('active');
        }

        _musicObj.changePlay();
    });

    _musicObj.$next.click(function(e) {
        e.stopPropagation();

        //修改audio路径为下一首歌
        if (_musicObj.$nowMusic.index() != _musicObj.sumMusic - 1) {
            //如果当前不是最后一首歌
            _musicObj.$nowMusic.removeClass('active').next().addClass('active');
        } else {
            //如果是最后一首歌
            _musicObj.$nowMusic.removeClass('active');
            $('#_musicLists ._musicLi:first-child').addClass('active');
        }

        _musicObj.changePlay();
    });

    $('#_musicLists ._musicLi').click(function() {
        //当点击歌曲列表时，如果点击的不是正在播放的歌曲就切换到点击歌曲，否则重新播放该歌曲
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
        }

        _musicObj.changePlay();
    });

    $('#_progress').click(function(e) {
        //当点击进度条时，切换到点击位置播放
        //获取点击进度条的横坐标
        var mouseX = e.clientX - $('#_progress')[0].getBoundingClientRect().left * ($('#_progress')[0].getBoundingClientRect().width / $('#_progress')[0].getBoundingClientRect().width);

        //将滚动条移动到点击位置
        _musicObj._audio.currentTime = parseInt(_musicObj.totalTime * parseFloat(mouseX / $('#_progress')[0].getBoundingClientRect().width));

        //初始化当前时常
        $('#_nowTime').text(_musicObj.transToTime(_musicObj._audio.currentTime));

        //切换为暂停按钮
        _musicObj.$play.hide();
        _musicObj.$pause.show();

        //开始播放
        _musicObj._audio.play();
    });

    _musicObj.$audio
        .on('play', function(e) {
            //监听播放属性，并阻止冒泡
            e.stopPropagation();
            var ai = 0; //执行滚动条滚动间隔

            //进度条开始运动
            _musicObj.progressRun = setInterval(function() {
                //实时获取当前播放时刻
                var now = _musicObj._audio.currentTime;

                //每十毫秒改变一次滚动条
                $('#_progressBar').css({
                    'left': parseInt(now / _musicObj.totalTime * 100) + '%'
                });
                $('#_progressLine').css({
                    'width': parseInt(now / _musicObj.totalTime * 100) + '%'
                });

                if (ai / 100 === 1) {
                    //每秒钟刷新当前播放歌曲时间
                    $('#_nowTime').text(_musicObj.transToTime(now));
                    if (ai === 100) {
                        ai = 0;
                    }
                }
                ai++;
            }, 10);
        })
        .on('pause', function(e) {
            //监听暂停属性，并阻止冒泡
            e.stopPropagation();

            //停止进度条
            clearInterval(_musicObj.progressRun);
        })
        .on('ended', function(e) {
            //监听播放结束属性，并阻止冒泡
            e.stopPropagation();

            //修改audio路径为下一首歌
            if (_musicObj.$nowMusic.index() != _musicObj.sumMusic - 1) {
                //如果当前不是最后一首歌
                _musicObj.$nowMusic.removeClass('active').next().addClass('active');
            } else {
                //如果是最后一首歌
                _musicObj.$nowMusic.removeClass('active');
                $('#_musicLists ._musicLi:first-child').addClass('active');
            }

            _musicObj.changePlay();
        });
});
