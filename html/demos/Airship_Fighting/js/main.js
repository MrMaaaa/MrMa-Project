$(document).ready(function() {
    //飞船基类
    var airplane = function(cover, x, y) {
        this.cover = cover || null;
        this.x = x || (gameUI.canvasWidth - 30) / 2;
        this.y = y || gameUI.canvasHeight - 100;
        this.width = 50;
        this.height = 100;
        this.moveSpeed = 4;
        this.bullet = [];
    };

    //玩家飞船
    var Player = function(cover, x, y) {
        this.cover = cover || null;
        this.x = x || (gameUI.canvasWidth - 30) / 2;
        this.y = y || gameUI.canvasHeight - 100;
        this.width = 50;
        this.height = 100;
        this.moveSpeed = 4;
        this.score = 0;
        this.hp = 100;
        this.life = 3;

        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            shoot: false,
            move: false,
            invincible: false
        };

        this.bullet = [];

        this.init = function() {
            this.cover = $('#airplaneList .airplane').eq(1).find('img')[0];

            //this.keyCheck();

            return true;
        };

        this.draw = function(context) {
            if (this.cover) {
                context.drawImage(this.cover, this.x, this.y, this.width, this.height);
            }
        }
    };

    //敌人飞船
    var Enemey = function(cover, x, y) {
        this.cover = cover || null;
        this.x = x || (gameUI.canvasWidth - 30) / 2;
        this.y = y || gameUI.canvasHeight - 100;
        this.width = 50;
        this.height = 100;
        this.moveSpeed = 4;
        this.bullet = [];

        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            shoot: false,
            move: false,
            invincible: false
        };
    };

    //继承
    extend(Player, airplane);
    extend(Enemey, airplane);

    //游戏DOM元素
    var gameUI = {
        $canvas: $('#myCanvas'), //获取画布DOM元素
        canvasWidth: $('#myCanvas').width(), //获取画布宽度
        canvasHeight: $('.main').height(), //获取画布高度
        context: $('#myCanvas')[0].getContext("2d"), //获取画布的绘制方法

        $start: $('#start'), //开始面板s
        $pause: $('#pause'), //暂停面板
        $gameInfo: $('#gameInfo'), //游戏信息栏
        $score: $('#score'), //分数
        $highScore: $('#highScore'), //最高分
        $airplaneList: $('#airplaneList'), //飞船图鉴列表

        $gameIntro: $('#gameIntro'), //游戏介绍面板
        $gameAbout: $('#gameAbout'), //游戏关于面板
        $gameGuide: $('#gameGuide'), //游戏关于面板

        $startBtn: $('#startButton'), //开始开始按钮
        $introBtn: $('#introButton'), //游戏介绍按钮
        $guideBtn: $('#guideButton'), //飞船图鉴按钮
        $aboutBtn: $('#aboutButton'), //游戏关于按钮
        $restartBtn: $('#restartButton'), //暂停面板重新开始菜单
        $backBtn: $('.backButton'), //返回按钮，点击该按钮将隐藏该按钮的父元素

        //初始化
        init: function() {
            //游戏开始
            gameUI.$canvas.attr('height', $('body').height() + 'px');
            gameUI.$startBtn.click(function() {
                $('.main .gameMain').hide();
                $('.main .gameLeft').show();
                $('.main .gameRight').show();
            });

            //游戏介绍
            gameUI.$introBtn.click(function() {
                gameUI.$gameIntro.show();
            });

            //飞船图鉴
            gameUI.$guideBtn.click(function() {
                gameUI.$gameGuide.show();
            });

            //飞船图鉴上一页
            $('#gameGuide .prev').click(function() {
                var left = gameUI.$airplaneList.css('left').replace('px', '');
                gameUI.$airplaneList.animate({
                    'left': (parseInt(left) + 800) + 'px'
                }, function() {
                    if (gameUI.$airplaneList.css('left').replace('px', '') == '0') {
                        gameUI.$airplaneList.css('left', '-20000px');
                    }

                });
            })

            //飞船图鉴下一页
            $('#gameGuide .next').click(function() {
                var left = gameUI.$airplaneList.css('left').replace('px', '');
                gameUI.$airplaneList.animate({
                    'left': (parseInt(left) - 800) + 'px'
                }, function() {
                    if (gameUI.$airplaneList.css('left').replace('px', '') == '-20800') {
                        gameUI.$airplaneList.css('left', '-800px');
                    }
                });
            })

            //游戏关于
            gameUI.$aboutBtn.click(function() {
                gameUI.$gameAbout.show();
            });

            //返回
            gameUI.$backBtn.click(function() {
                $(this).parent().hide();
            });
        }
    };

    //游戏状态
    var game = {
        //0：暂停   1：运行中   -1：结束
        state: '0',

        init: function() {
            game.state = '1';
            return true;
        },

        //移动检测
        moveCheck: function(obj) {
            //按键移动与范围检测
            if (obj.state.up && obj.y > 0) {
                obj.y -= obj.moveSpeed;
            }

            if (obj.state.down && (obj.y + obj.height) < gameUI.canvasHeight) {
                obj.y += obj.moveSpeed;
            }

            if (obj.state.left && obj.x > 0) {
                obj.x -= obj.moveSpeed;
            }

            if (obj.state.right && (obj.x + obj.width) < gameUI.canvasWidth) {
                obj.x += obj.moveSpeed;
            }

            return true;
        },

        //动画函数，带兼容性检测
        animateFrame: function(func) {
            var animate = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };

            animate(func);
        },

        //该函数是用来每一帧的绘制，需要重写
        draw: function() {},

        //主函数
        run: function() {
            if (game.state === '1') {
                //清除画布
                gameUI.context.clearRect(0, 0, gameUI.canvasWidth, gameUI.canvasHeight);

                //动画处理
                game.draw();

                //动画循环
                game.animateFrame(game.run);
            } else {
                if (game.state === '0') {
                    //暂停
                } else if (game.state === '-1') {
                    //停止
                }
            }
        },

        keyPress: function(obj) {
            $(window).keydown(function(e) {
                var e = e || window.event;
                e.preventDefault();
                var keyCode = e.keyCode;

                //A or left arrow
                if (keyCode == 37 || keyCode == 65) {
                    obj.state.left = true;
                    obj.state.move = true;
                }

                //D or right arrow
                if (keyCode == 39 || keyCode == 68) {
                    obj.state.right = true;
                    obj.state.move = true;
                }

                //W or up arrow
                if (keyCode == 38 || keyCode == 87) {
                    obj.state.up = true;
                    obj.state.move = true;
                }

                //S or down arrow
                if (keyCode == 40 || keyCode == 83) {
                    obj.state.down = true;
                    obj.state.move = true;
                }

                //Space
                if (keyCode == 32) {
                    obj.state.shoot = true;
                }
            });

            $(window).keyup(function(e) {
                var e = e || window.event;
                e.preventDefault();
                var keyCode = e.keyCode;

                //A or left arrow
                if (keyCode == 37 || keyCode == 65) {
                    obj.state.left = false;
                }

                //D or right arrow
                if (keyCode == 39 || keyCode == 68) {
                    obj.state.right = false;
                }

                //W or up arrow
                if (keyCode == 38 || keyCode == 87) {
                    obj.state.up = false;
                }

                //S or down arrow
                if (keyCode == 40 || keyCode == 83) {
                    obj.state.down = false;
                }

                //Space
                if (keyCode == 32) {
                    obj.state.shoot = false;
                }

                //Esc
                if (keyCode == 27) {
                    if (game.state === '1') {
                        game.state = '0';
                        gameUI.$pause.show();
                    } else {
                        game.state = '1';
                        game.run();
                        gameUI.$pause.hide();
                    }
                }
            });
        }
    }

    //初始化游戏界面
    gameUI.init();

    //点击开始游戏
    gameUI.$startBtn.click(function() {
        game.init();

        var p1 = new Player();
        p1.init();

        game.keyPress(p1);

        game.draw = function() {
            p1.draw(gameUI.context);
            game.moveCheck(p1);
        };

        game.run();
    });
});
