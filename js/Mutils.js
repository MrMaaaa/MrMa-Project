/**
 * Created by hasee on 2016/8/9 009.
 */

//产生随机整数
function random_int(min_num, max_num, random_type) {
	//如果数值输反了自行纠正
	if (min_num === max_num) {
		return min_num;
	} else if (min_num > max_num) {
		var temp = max_num;
		max_num = min_num;
		min_num = temp;
	}

	var length_num = max_num - min_num;

	if (random_type === 2 || random_type == undefined) {
		//包含边界值，默认类型
		return Math.round(Math.random() * length_num + min_num);
	} else if (random_type === 0) {
		//不包含边界值
		return Math.round(Math.random() * (length_num - 2) + min_num + 1);
	} else if (random_type === -1) {
		//包含左边界值
		return parseInt(Math.random() * length_num + min_num, 10);
	} else if (random_type === 1) {
		//包含右边界值
		return Math.round(Math.random() * (length_num - 1) + min_num) + 1;
	}
}

//扩展Math方法，产生随机整数
if (!Math.randomPro) {
	Math.randomPro = function(min_num, max_num, random_type) {
		if (min_num === max_num) {
			return min_num;
		} else if (min_num > max_num) {
			var temp = max_num;
			max_num = min_num;
			min_num = temp;
		}

		var length_num = max_num - min_num;

		if (random_type === 2 || random_type == undefined) {
			//包含边界值，默认类型
			return Math.round(Math.random() * length_num + min_num);
		} else if (random_type === 0) {
			//不包含边界值
			return Math.round(Math.random() * (length_num - 2) + min_num + 1);
		} else if (random_type === -1) {
			//包含左边界值
			return parseInt(Math.random() * length_num + min_num, 10);
		} else if (random_type === 1) {
			//包含右边界值
			return Math.round(Math.random() * (length_num - 1) + min_num) + 1;
		}
	};
}


//对指定的数组中的值进行随机
if (!Math.randomValForList) {
	Math.randomList = function(arr) {
		return arr[Math.round(Math.random() * (arr.length - 1))];
	};
}


//扩写Array方法，初始化数组值为str
if (!Array.init) {
	Array.init = function(str) {
		for (var i = 0; i < this.length; i++) {
			this[i] = str;
		}
		return this;
	};
}

//构造函数继承
function extend(Child, Parent) {
	var F = function() {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;

	Child.uber = Parent.prototype;
	//意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
}
