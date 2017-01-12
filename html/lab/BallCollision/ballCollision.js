/**
 * Created by hasee on 2016/6/29 029.
 */

$(document).ready(
	function() {
		var canvas = $("#ballCollisionCanvas"); //获取画布元素
		var context = canvas.get(0).getContext("2d");

		/*var canvasWidth = canvas.width();//获取画布的宽度
		var canvasHeight = canvas.height();//获取画布的高度*/

		var canvasWidth = parseInt(canvas.attr('width').replace('px', ''));//获取画布的宽度
		var canvasHeight = parseInt(canvas.attr('height').replace('px', ''));//获取画布的高度

		
		//使画布的宽高总等于当前窗口的宽高
		function resizeCanvas() {
			canvas.attr("width", $(window).get(0).innerWidth);//改变画布宽度为当前窗口宽度
			canvas.attr("height", $(window).get(0).innerHeight);//改变画布高度为当前窗口高度
			canvasWidth = canvas.width();
			canvasHeight = canvas.height();
		}

		//当窗口大小变化时运行resizeCanvas
		$(window).resize(resizeCanvas);
		resizeCanvas();

		var playAnimation = false; //判断是否执行动画

		var start = 0;
		var end = 0;

		var startButton = $("#ballCollision button.startAnimation"); //开始按钮
		var stopButton = $("#ballCollision button.stopAnimation"); //停止按钮

		stopButton.hide();

		startButton.click(function() {
			$(this).hide();
			stopButton.show();
			playAnimation = true;
			animate();
		});

		stopButton.click(function() {
			$(this).hide();
			startButton.show();
			playAnimation = false;
		});

		//小行星的参数
		var Asteroid = function(x, y, radius, mass, vX, vY, aX, aY, color) {
			this.x = x; //x坐标
			this.y = y; //y坐标
			this.radius = radius; //半径
			this.mass = mass; //质量
			this.vX = vX; //x方向速度
			this.vY = vY; //y方向速度
			this.aX = aX; //x方向加速度
			this.aY = aY; //y方向加速度
			this.color = color; //颜色（用整数表示）
		};

		var asteroids = new Array(); //用来生成若干数量Asteroid的数组

		//循环生成Asteroid
		for (var i = 0; i < 40; i++) {
			var x = 20 + parseInt((Math.random() * (canvasWidth - 40)));
			var y = 20 + parseInt((Math.random() * (canvasHeight - 40)));
			var radius = parseInt(5 + Math.random() * 20);
			var mass = radius / 2;
			var vX = parseInt(Math.random() * 2 + 1);
			var vY = parseInt(Math.random() * 2 + 1);
			//var aX=Math.random()*0.2-0.1;
			//var aY=Math.random()*0.2-0.1;
			var aX = 0;
			var aY = 0;
			var color = parseInt(Math.random() * 6);

			//赋值并传入asteroids数组中
			asteroids.push(new Asteroid(x, y, radius, mass, vX, vY, aX, aY, color));
		}

		//动画函数
		function animate() {
			context.clearRect(0, 0, canvasWidth, canvasHeight); //清除画布
			context.fillStyle = "#3cf"; //Asteroid颜色

			var asteroidsLength = asteroids.length; //要绘制的Asteroid的数量

			for (var i = 0; i < asteroidsLength; i++) {
				var tmpAsteroid = asteroids[i]; //遍历asteroids数组赋给一个临时变量

				//该循环用来判定两个Asteroid是否碰撞并给出碰撞角度
				for (var j = i + 1; j < asteroidsLength; j++) {
					//将下一个Asteroid赋给一个临时变量
					var tmpAsteroidB = asteroids[j];

					var dX = tmpAsteroidB.x - tmpAsteroid.x; //x方向圆心距
					var dY = tmpAsteroidB.y - tmpAsteroid.y; //y方向圆心距
					var distance = Math.sqrt((dX * dX) + (dY * dY)); //两个Asteroid的圆心距

					//如果圆心距小于半径和，即发生碰撞
					if (distance < tmpAsteroid.radius + tmpAsteroidB.radius) {
						//碰撞时颜色改变
						/*var color1=tmpAsteroid.color;
						 var nColor1=parseInt(Math.random()*6);
						 var color2=tmpAsteroidB.color;
						 var nColor2=parseInt(Math.random()*6);
						 while(nColor1==color1)
						 {
						 nColor1=parseInt(Math.random()*6);
						 }
						 while(nColor2==color2)
						 {
						 nColor2=parseInt(Math.random()*6);
						 }

						 tmpAsteroid.color=nColor1;
						 tmpAsteroidB.color=nColor2;*/

						//碰撞时半径改变
						/*if(tmpAsteroid.radius>tmpAsteroidB.radius)
						 {
						 tmpAsteroid.radius-=1;
						 tmpAsteroidB.radius+=1;
						 }
						 else
						 {
						 tmpAsteroid.radius+=1;
						 tmpAsteroidB.radius-=1;
						 }*/

						//计算角度
						var angle = Math.atan2(dY, dX);
						var sine = Math.sin(angle); //正弦值
						var cosine = Math.cos(angle); //余弦值

						var x = 0;
						var y = 0;

						var xB = dX * cosine + dY * sine;
						var yB = dY * cosine - dX * sine;

						var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine;
						var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine;

						var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine;
						var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine;

						var vTotal = vX - vXb;
						vX = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vX + 2 * tmpAsteroidB.mass * vXb) / (tmpAsteroid.mass + tmpAsteroidB.mass);
						vXb = vTotal + vX;

						xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius);


						tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine);
						tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine);

						tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB * sine);
						tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine + xB * sine);

						tmpAsteroid.vX = vX * cosine - vY * sine;
						tmpAsteroid.vY = vY * cosine + vX * sine;

						tmpAsteroidB.vX = vXb * cosine - vYb * sine;
						tmpAsteroidB.vY = vYb * cosine + vXb * sine;
					}
				}

				tmpAsteroid.x += tmpAsteroid.vX;
				tmpAsteroid.y += tmpAsteroid.vY;

				//加速度
				/*if(Math.abs(tmpAsteroid.vX)<10)
				 {
				 tmpAsteroid.vX+=tmpAsteroid.aX;
				 }
				 if(Math.abs(tmpAsteroid.vY)<10)
				 {
				 tmpAsteroid.vY+=tmpAsteroid.aY;
				 }*/

				//摩擦力
				/*if(Math.abs(tmpAsteroid.vX)>0.1)
				 {
				 tmpAsteroid.vX*=0.9;
				 }
				 else
				 {
				 tmpAsteroid.vX=0;
				 }
				 if(Math.abs(tmpAsteroid.vY)>0.1)
				 {
				 tmpAsteroid.vY*=0.9;
				 }
				 else
				 {
				 tmpAsteroid.vY=0;
				 }*/

				//给小球绘制不同的颜色
				switch (tmpAsteroid.color) {
					case 0:
						context.fillStyle = "#f00";
						break;
					case 1:
						context.fillStyle = "#f60";
						break;
					case 2:
						context.fillStyle = "#ff0";
						break;
					case 3:
						context.fillStyle = "#6f6";
						break;
					case 4:
						context.fillStyle = "#3ff";
						break;
					case 5:
						context.fillStyle = "#09f";
						break;
					case 6:
						context.fillStyle = "#f3f";
						break;
					default:
						break;
				}

				//绘制
				context.beginPath();
				context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI * 2, false);
				context.closePath();
				context.fill();

				//判断是否超出画布范围
				if (tmpAsteroid.x - tmpAsteroid.radius < 0) {
					tmpAsteroid.x = tmpAsteroid.radius;
					tmpAsteroid.vX *= -1;
					//tmpAsteroid.aX*=-1;
				} else if (tmpAsteroid.x + tmpAsteroid.radius > canvasWidth) {
					tmpAsteroid.x = canvasWidth - tmpAsteroid.radius;
					tmpAsteroid.vX *= -1;
					//tmpAsteroid.aX*=-1;
				}

				if (tmpAsteroid.y - tmpAsteroid.radius < 0) {
					tmpAsteroid.y = tmpAsteroid.radius;
					tmpAsteroid.vY *= -1;
					//tmpAsteroid.aY*=-1;
				} else if (tmpAsteroid.y + tmpAsteroid.radius > canvasHeight) {
					tmpAsteroid.y = canvasHeight - tmpAsteroid.radius;
					tmpAsteroid.vY *= -1;
					//tmpAsteroid.aY*=-1;
				}
			}

			if (playAnimation) {
				//setTimeout(animate, 1000 / 60); //60帧
				window.requestAnimationFrame(animate);
			}
		}

		animate();
	}
);
