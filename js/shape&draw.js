/**
 * Created by hasee on 2016/7/9 009.
 */

function Circle(x, y, radius, color, strokeColor, lineWidth, lineJoin, alpha, scaleX, scaleY, translateX, translateY, rotateDeg)//圆
{
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

	this.Draw = function(drawType, context)
	{
		this.context = context || this.context;

		if(this.context != undefined && typeof this.context === 'object')
		{
			var type = drawType || 3;
			this.context.save();
			this.context.fillStyle = this.color;
			this.context.strokeStyle = this.strokeColor;
			this.context.lineWidth = this.lineWidth;
			this.context.lineJoin = this.lineJoin;//线条相交样式，默认为miter(尖角)，可选bevel(斜角)和round(圆角)
			this.context.globalAlpha = this.alpha;
			this.context.scale(this.scaleX, this.scaleY);
			this.context.translate(this.translateX, this.translateY);
			this.context.rotate(this.rotateDeg);
			this.context.beginPath();
			this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			this.context.closePath();
			if(type == 0)
			{  console.log('没有画到画布中');  }
			else if(type == 1)
			{  this.context.fill();  }
			else if(type == 2)
			{  this.context.stroke();  }
			else
			{
				this.context.stroke();
				this.context.fill();
			}
			this.context.restore();
		}
		else
			alert('Please define variable "context" in function "Circle"');
	}
}

function Rectangle(x, y, width, height, color, strokeColor, lineWidth, lineJoin, alpha, scaleX, scaleY, translateX, translateY, rotateDeg)//矩形
{
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

	this.Draw = function(drawType, context)
	{
		this.context = context || this.context;

		if(this.context != undefined && typeof this.context === 'object')
		{
			var type = drawType || 3;
			this.context.save();
			this.context.fillStyle = this.color;
			this.context.strokeStyle = this.strokeColor;
			this.context.lineWidth = this.lineWidth;
			this.context.lineJoin = this.lineJoin;//线条相交样式，默认为miter(尖角)，可选bevel(斜角)和round(圆角)
			this.context.globalAlpha = this.alpha;
			this.context.scale(this.scaleX, this.scaleY);
			this.context.translate(this.translateX, this.translateY);
			this.context.rotate(this.rotateDeg);
			if(type == 0)
			{  console.log('没有画到画布中');  }
			else if(type == 1)
			{  this.context.fillRect(this.x, this.y, this.width, this.height);  }
			else if(type == 2)
			{  this.context.strokeRect(this.x, this.y, this.width, this.height);  }
			else
			{
				this.context.fillRect(this.x, this.y, this.width, this.height);
				this.context.strokeRect(this.x, this.y, this.width, this.height);
			}
			this.context.restore();
		}
		else
			alert('Please define variable "context" in function "Rectangle"');
	}
}

function Polygon(x, y, sides, range, color, strokeColor, lineWidth, lineJoin, alpha, scaleX, scaleY, translateX, translateY, rotateDeg)//绘制正多边形，设置其默认属性
{
	this.x = x || 100;
	this.y = y || 100;
	this.sides = sides || 3;//多边形边数
	this.range = range || 100;//中点到各个顶点的距离
	this.color = color || "#000";
	this.strokeColor = strokeColor || "#000";
	this.scaleX = scaleX || 1;
	this.scaleY = scaleY || 1;
	this.translateX = translateX || 0;
	this.translateY = translateY || 0;
	this.rotateDeg = rotateDeg || 0;
	this.lineWidth = lineWidth;
	this.lineJoin = lineJoin;//线条相交样式，默认为miter(尖角)，可选bevel(斜角)和round(圆角)
	this.alpha = alpha;//透明度
	this.context = undefined;

	this.Draw = function(drawType, context)//DrawType参数解释：0表示无，2表示fill，2表示stroke，其他值表示两者都有
	{
		this.context = context || this.context;

		if(this.context != undefined && typeof this.context === 'object')
		{
			var type = drawType || 3;
			this.context.save();
			this.context.fillStyle = this.color;
			this.context.strokeStyle = this.strokeColor;
			this.context.lineWidth = this.lineWidth;
			this.context.lineJoin = this.lineJoin;
			this.context.globalAlpha = this.alpha;
			this.context.scale(this.scaleX, this.scaleY);
			this.context.translate(this.translateX, this.translateY);
			this.context.rotate(this.rotateDeg);
			this.context.beginPath();
			this.context.translate(this.x, this.y);
			this.context.moveTo(0, -this.range);
			for(var i = 0; i < this.sides; i++)
			{
				this.context.rotate(Math.PI * 2 / this.sides);
				this.context.lineTo(0, -this.range);
			}
			this.context.closePath();
			if(type == 0)
			{  console.log('没有画到画布中');  }
			else if(type == 1)
			{  this.context.fill();  }
			else if(type == 2)
			{  this.context.stroke();  }
			else
			{
				this.context.stroke();
				this.context.fill();
			}
			this.context.restore();
		}
		else
			alert('Please define variable "context"" in function "Polygon""');
	}
}
