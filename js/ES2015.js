'use strict';

//let
{
    let name = 'ma';

    while (true) {
        let name = 'mr';
        console.log(name); //输出mr
        break;
    }

    console.log(name); //输出ma

    //let声明的变量不存在{变量提升}概念，因此在使用let声明变量之前不要进行任何其他操作，否则会造成{死区}
    //ES6会对重复声明报错，因此不能在函数中声明变量名为参数名

    //注意用let声明的变量不属于{顶层变量}
    //console.log(window.name); //undefined
}

//const
{
    const sum = 10;
    //sum = 12; //error: TypeError: Assignment to constant variable.

    //必须在声明后赋值，{const sum;}将会报错，并且声明常量名不可重复
    //如果声明一个数组，可以使用数组的方法插入删除等，不可修改其指向的内存地址（重新赋值），对象同理
    const arr = [];
    //arr = [1, 2, 3];//error: TypeError: Assignment to constant variable.
    arr.push(1); //正确
    console.log(arr); //[1]

    //如果不想使const对象可进行其操作，可使用freeze()方法使其不可写
    const obj = Object.freeze({});
    //obj.val = 1; // error: TypeError: Can't add property val, object is not extensible
}

//class, extends, super
{
    class Animal {
        //构造函数
        constructor() {
            //私有属性/方法/对象
            this.type = 'animal';
        };

        //方法
        say() {
            console.log('this is a ' + this.type);
        };
    };

    class Cat extends Animal {
        constructor() {
            //子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象
            super();
            this.type = 'cat';
        };
    };

    let a1 = new Animal();
    a1.say(); //this is a animal

    let c1 = new Cat();
    //如果在示例中重写属性或方法，不会影响到其他实例
    c1.say(); //this is a cat
}

//rest, spread
{
    //rest用来获取函数多余的参数，代替arguments，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错，即(a, ...nums)或(a, b, ...nums)为正确格式，(a, ...nums, b)为错误格式
    function sum(...nums) {
        let _sum = 0;
        for (let i of nums) {
            _sum += i;
        }
        return _sum;
    }

    console.log(sum(1, 2, 3, 4, 5)); //15


    //spread是扩展运算符，写法为{...}，将一个数组转为用{,}分隔的参数列表
    console.log(0, ...[1, 2, 3], 4); //0 1 2 3 4

    function add(x, y) {
        return (x + y);
    }

    console.log(add(...[1, 2])); //3

    //运用扩展运算符可以展开数组，因此不必使用apply()方法将数组转换为函数的参数

    //应用Math.max()方法求数组的最大元素
    // ES5的写法
    console.log(Math.max.apply(null, [14, 3, 77])); //77

    // ES6的写法
    console.log(Math.max(...[14, 3, 77])); //77

    // 等同于
    console.log(Math.max(14, 3, 77)); //77

    //使用push()方法将一个数组插入到另一个数组的尾部
    // ES5的写法
    let arr1 = [0, 1, 2];
    let arr2 = [3, 4, 5];
    Array.prototype.push.apply(arr1, arr2);
    console.log(arr1); //[0, 1, 2, 3, 4, 5]

    // ES6的写法
    let arr3 = [0, 1, 2];
    let arr4 = [3, 4, 5];
    arr3.push(...arr4);
    let arr5 = [...arr3, ...arr4]; //合并数组
    console.log(arr3); //[0, 1, 2, 3, 4, 5]
    console.log(arr5); //[0, 1, 2, 3, 4, 5, 3, 4, 5]


    //还可以将字符串转为数组
    let strArr = [...'hello world'];
    console.log(strArr); //["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
}

//arrow function
{
    //ES5写法
    (function(i) {
        console.log(i * i);
    })(5); //25

    //arrow function
    ((i) => {
        console.log(i * i);
    })(5); //25

    //注意，如果创建一个对象（即使非空）时需要用小括号来包裹该空对象，否则会被编译为一个空的块(block)
    //例子：(a, b) => ({a: b});

    //使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象，实际原因是箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this
}

//string
{
    let test = 'hello world';
    console.log(test.includes('he', 0)); //true 是否包含指定字符串，返回布尔值，第二个参数表示从n个位置到结束
    console.log(test.startsWith('h', 0)); //true 字符串头部是否包含指定字符串，返回布尔值，第二个参数表示从n个位置到结束
    console.log(test.endsWith('e', 2)); //true 字符串尾部是否包含指定字符串，返回布尔值
    //这三个方法都包含第二个参数，指定起始位置，第二个参数表示前n个位置

    console.log(test.repeat(2)); //hello worldhello world 返回重复了n次的字符串，n为字符串将转为数字

    console.log('1'.padStart(10, '0')); //补全头部函数
    console.log('02'.padEnd(8, '-MM-YYYY')); //补全尾部函数
    //第一个参数指定最小长度，第二个参数指定补全内容，内容会重复以达到最小长度，如果超出最小长度则不补全，并且会截断最小长度的长度返回，如果不含第二个参数则默认补全空格
}

//template string
{
    let user = {
        name: 'jack',
        age: '18'
    };
    //普通写法
    console.log('我是' + user.name + '，我的年龄是' + user.age); //我是jack，我的年龄是18
    //template写法
    console.log(`我是${user.name}，我的年龄是${user.age}`); //我是jack，我的年龄是18
    //输入$等特殊字符时需要使用\转义
    console.log(`\$\``); //$`

    //两个{`}之间的内容接受字符串、数组、对象、函数等，并且会保留缩进、换行、空格，如果不想要换行，``后加上.trim()即可
}

//destructuring
{
    //解构
    //ES5写法
    let cat = 'tom';
    let mouse = 'jerry';
    let animal = {
        cat: cat,
        mouse: mouse
    };
    console.log(animal); //Object {cat: "tom", mouse: "jerry"}

    //ES6写法
    let newAnimal = {
        cat,
        mouse
    };
    console.log(newAnimal); //Object {cat: "tom", mouse: "jerry"}

    let [aa = '11', bb, cc] = [1, 2, 3]; //在这种写法中如果两边参数不对等，仍能完成{匹配}，该写法允许设置默认值
    console.log(aa, bb, cc); //1 2 3
}

//default, rest
{
    //default指设置默认值可以直接在形参处赋初值，rest指获取函数的输入参数
    //ES5写法
    function oldDefault(a) {
        var a = a || 'a';
        console.log(a);
    }

    function oldRest(a, b, c) {
        console.log(arguments);
    }

    //ES6写法
    function newDefault(a = 'a') {
        console.log(a);
    }

    function newRest(...types) {
        console.log(types);
    }

    oldDefault(); //a
    newDefault(); //a

    oldRest('1', '2', '3'); //["1", "2", "3", callee: (...), Symbol(Symbol.iterator): function]
    newRest('1', '2', '3'); //["1", "2", "3"]
}

//symbol
{
    //一种新的数据类型，通常用于作为对象的属性的标识符来确保该属性名独一无二，无法与其他数值进行运算{如+}，但可以作为布尔值，如下s1==true,!s1==false
    let s1 = Symbol('s1'); //在此传入的字符串{s}主要是用于区分不同的symbol
    let s2 = Symbol('s2'); //在此传入的字符串{s}主要是用于区分不同的symbol
    console.log(s1.toString()); //Symbol(s1)
    console.log(s2.toString()); //Symbol(s2)
    console.log(typeof s1); //symbol

    //symbol数值作为属性名时，不能使用.运算符，只能使用[]，否则属性名是字符串而非symbol类型
    //使用{Symbol.for('name')}来进行赋值时，会先进行已有symbol变量名的查找，如果有，则返回已声明的symbol，否则新建symbol变量，即Symbol.for('sss') === Symbol.for('sss')为true，而上述声明的s1 === s2则为false
}

// map reduce filter forEach some every

//Set
{
    let set = new Set(); //也可以写成let set = new Set([1, 1, '1', 2, 3, 4]);
    [1, 1, '1', 2, 3, 4].map(x => set.add(x));

    //Set集合不接受重复字符
    console.log(set); //Set(5) {1, "1", 2, 3, 4}

    console.log(set.size); //5

    //可以用Set来清除重复的数组成员
    let arr = [...new Set([1, 1, 2, 2, 3, 3])]; //也可以写成let arr = Array.from(new Set([1, 1, 2, 2, 3, 3]));
    console.log(arr); //[1, 2, 3]

    // add(value)：添加某个值，返回Set结构本身。
    // delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    // has(value)：返回一个布尔值，表示该值是否为Set的成员。
    // clear()：清除所有成员，没有返回值。
    // keys()：返回键名的遍历器
    // values()：返回键值的遍历器
    // entries()：返回键值对的遍历器
    // forEach()：使用回调函数遍历每个成员
    // 由于Set中的键名和值名是同一个值（或者说只有值名），因此keys()与values()的结果完全一致，entries()得到的则是一个key: value相同的一个数组，因此在for-of遍历中{let i of set/set.keys()}/set.values()}的i的结果完全一致，而{let i of set/set.entries()}中i为一键值相等的数组
}

//Map
{
    //与传统的对象键名只能为字符串相比，Map允许任意类型数据作为键名
    let map = new Map();
    map.set(1, 'a').set(2, 'b'); //添加键值对，set()方法返回Map自身，因此可以链式添加
    map.set(1, 'b'); //后一次的添加会覆盖之前的键值对

    //根据键名获取值名
    console.log(map.get(1)); //b

    //键值对的个数
    console.log(map.size); //1

    // delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    // has(value)：返回一个布尔值，表示该值是否为Set的成员。
    // clear()：清除所有成员，没有返回值。
    // keys()：返回键名的遍历器
    // values()：返回键值的遍历器
    // entries()：返回键值对的遍历器
    // forEach()：遍历Map的所有成员
}
