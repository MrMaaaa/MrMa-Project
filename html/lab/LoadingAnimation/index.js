$(function() {
    $('.toggleAnimation1').click(function() {
        toggleClick($('.animation-1 .ball'), this);
    });

    $('.toggleAnimation2').click(function() {
        toggleClick($('.animation-2 .shape'), this);
    });

    $('.toggleAnimation3').click(function() {
        toggleClick([$('.animation-3 .bead1'), $('.animation-3 .bead5')], this);
    });

    $('.toggleAnimation4').click(function() {
        toggleClick([$('.animation-4 .ball1'), $('.animation-4 .ball2'), $('.animation-4 .ball3'), $('.animation-4 .ball4')], this);
    });

    //该函数用于给指定的jquery 对象/对象数组 toggle一个active类
    function toggleClick($domArr, that) {
        var that = $(that);

        if (Object.prototype.toString.call($domArr).slice(8, -1) !== 'Array') {
            $domArr.toggleClass('active');
        } else {
            for (var i = 0; i < $domArr.length; i++) {
                $domArr[i].toggleClass('active');
            }
        }

        that.text() === 'run' ? that.text('stop') : that.text('run');
    }
});
