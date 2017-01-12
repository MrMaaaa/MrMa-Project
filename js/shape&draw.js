/**
 * Created by hasee on 2016/7/9 009.
 */

var mShape = {
	Circle: function(x, y, radius, color, strokeColor, lineWidth, lineJoin, alpha, scaleX, scaleY, translateX, translateY, rotateDeg) {
		this.x = x || 50;
		this.y = y || 50;
		this.radius = radius || 50;
		this.color = color || "#000";
		this.strokeColor = strokeColor || "#000";
		this.scaleX = scaleX || 1;
		this.scaleY = scaleY || 1;
		this.translateX = translateX || 0;
		this.translateY = translateY || 0;
		this.rotateDeg = rotateDeg || 0;
		this.lineWidth = lineWidth;
		this.lineJoin = lineJoin;
		this.alpha = alpha;
		this.context = undefined;

		this.draw = function(drawType, context) {
			var context = context || this.context;

			if (context && typeof context === 'object') {
				var type = drawType || 3;
				context.save();
				context.fillStyle = this.color;
				context.strokeStyle = this.strokeColor;
				context.lineWidth = this.lineWidth;
				context.lineJoin = this.lineJoin; //线条相交样式，默认为miter(尖角)，可选bevel(斜角)和round(圆角)
				context.globalAlpha = this.alpha;
				context.scale(this.scaleX, this.scaleY);
				context.translate(this.translateX, this.translateY);
				context.rotate(this.rotateDeg);
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
				context.closePath();
				if (type == 0) {
					console.log('没有画到画布中');
				} else if (type == 1) {
					context.fill();
				} else if (type == 2) {
					context.stroke();
				} else {
					context.stroke();
					context.fill();
				}
				context.restore();
			} else {
				alert('Please define variable "context" in function "Circle"');
			}
		}
	},
	Rectangle: function(x, y, width, height, color, strokeColor, lineWidth, lineJoin, alpha, scaleX, scaleY, translateX, translateY, rotateDeg) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 100;
		this.height = height || 100;
		this.color = color || "#000";
		this.strokeColor = strokeColor || "#000";
		this.scaleX = scaleX || 1;
		this.scaleY = scaleY || 1;
		this.translateX = translateX || 0;
		this.translateY = translateY || 0;
		this.rotateDeg = rotateDeg || 0;
		this.lineWidth = lineWidth;
		this.lineJoin = lineJoin;
		this.alpha = alpha;
		this.context = undefined;

		this.draw = function(drawType, context) {
			var context = context || this.context;

			if (context && typeof context === 'object') {
				var type = drawType || 3;
				context.save();
				context.fillStyle = this.color;
				context.strokeStyle = this.strokeColor;
				context.lineWidth = this.lineWidth;
				context.lineJoin = this.lineJoin; //线条相交样式，默认为miter(尖角)，可选bevel(斜角)和round(圆角)
				context.globalAlpha = this.alpha;
				context.scale(this.scaleX, this.scaleY);
				context.translate(this.translateX, this.translateY);
				context.rotate(this.rotateDeg);
				if (type == 0) {
					console.log('没有画到画布中');
				} else if (type == 1) {
					context.fillRect(this.x, this.y, this.width, this.height);
				} else if (type == 2) {
					context.strokeRect(this.x, this.y, this.width, this.height);
				} else {
					context.fillRect(this.x, this.y, this.width, this.height);
					context.strokeRect(this.x, this.y, this.width, this.height);
				}
				context.restore();
			} else
				alert('Please define variable "context" in function "Rectangle"');
		}
	},
	Polygon: function(x, y, sides, range, color, strokeColor, lineWidth, lineJoin, alpha, scaleX, scaleY, translateX, translateY, rotateDeg) {
		this.x = x || 100;
		this.y = y || 100;
		this.sides = sides || 3; //多边形边数
		this.range = range || 100; //中点到各个顶点的距离
		this.color = color || "#000";
		this.strokeColor = strokeColor || "#000";
		this.scaleX = scaleX || 1;
		this.scaleY = scaleY || 1;
		this.translateX = translateX || 0;
		this.translateY = translateY || 0;
		this.rotateDeg = rotateDeg || 0;
		this.lineWidth = lineWidth;
		this.lineJoin = lineJoin; //线条相交样式，默认为miter(尖角)，可选bevel(斜角)和round(圆角)
		this.alpha = alpha; //透明度
		this.context = undefined;

		//DrawType参数解释：0表示无，2表示fill，2表示stroke，其他值表示两者都有
		this.draw = function(drawType, context) {
			var context = context || this.context;

			if (context && typeof context === 'object') {
				var type = drawType || 3;
				context.save();
				context.fillStyle = this.color;
				context.strokeStyle = this.strokeColor;
				context.lineWidth = this.lineWidth;
				context.lineJoin = this.lineJoin;
				context.globalAlpha = this.alpha;
				context.scale(this.scaleX, this.scaleY);
				context.translate(this.translateX, this.translateY);
				context.rotate(this.rotateDeg);
				context.beginPath();
				context.translate(this.x, this.y);
				context.moveTo(0, -this.range);
				for (var i = 0; i < this.sides; i++) {
					context.rotate(Math.PI * 2 / this.sides);
					context.lineTo(0, -this.range);
				}
				context.closePath();
				if (type == 0) {
					console.log('没有画到画布中');
				} else if (type == 1) {
					context.fill();
				} else if (type == 2) {
					context.stroke();
				} else {
					context.stroke();
					context.fill();
				}
				context.restore();
			} else
				alert('Please define variable "context"" in function "Polygon""');
		}
	},
	Img: function(img, x, y, width, height, sx, sy, swidth, sheight) {
		this.img = img;
		this.sx = sx; //剪切的x坐标
		this.sy = sy; //剪切的y坐标
		this.swidth = swidth; //剪切的宽度
		this.sheight = sheight; //剪切的高度
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 60;
		this.height = height || 60;
		this.context = undefined;

		this.draw = function(context) {
			var context = context || this.context;

			if (this.img && context && typeof context === 'object') {
				context.save();
				if (this.sx && this.sy && this.swidth && this.sheight) {
					context.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
				} else {
					context.drawImage(this.img, this.x, this.y, this.width, this.height);
				}
				context.restore();
			} else {
				alert('Please define variable "context" or "img" in function "Img"');
			}
		}
	}
}
