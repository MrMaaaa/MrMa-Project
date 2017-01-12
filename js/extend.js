//构造函数继承
function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;

    Child.uber = Parent.prototype;
    //意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
}

//非构造函数继承

//使用时先继承后定义
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

//深拷贝模式
function deepCopy(child, person) {
    var child = child || {};
    for (var i in person) {
        if (typeof person[i] === 'object') {
            //为了避免直接赋值时改变子对象内容父对象也会发生改变，在此特殊处理
            child[i] = (person[i].constructor === Array) ? [] : {};

            deepCopy(person[i], child[i]);
        } else {
            child[i] = person[i];
        }
    }
    return child;
}

//构造函数继承

//父类
function Person(name, age, sex) {
    this.name = name || 'name';
    this.age = age || 0;
    this.sex = sex || 'man';
}

Person.prototype = {
    say: function() {
        console.log('I am ' + this.name + ', and I am ' + this.age + ' years old, I am a ' + this.sex + '.');
    },

    ownName: function() {
        console.log('Person');
    }
}

//子类1
function Man(name, age) {
    this.name = name;
    this.age = age;
    this.sex = 'man';
}

extend(Man, Person);
//如果子类也需要声明公有变量或方法，则需要在继承后再声明公有变量或方法

//子类2
function Woman(name, age) {
    this.name = name;
    this.age = age;
    this.sex = 'woman';
}

extend(Woman, Person);

var p1 = new Man('jack', 20);
p1.say();
p1.ownName();

var p2 = new Woman('mary', 21);
p2.say();

//非构造函数继承

//父类
var usa = {
    nation: '美国'
};

var cn = {
    nation: '中国'
};

//子类

var xiaoming = {
    name: '小明'
};

//先继承
var jack = object(usa);

//后定义
jack.name = 'jack';

console.log('I am ' + jack.name + ' and I come from ' + jack.nation + '.');

//深拷贝
deepCopy(xiaoming, cn);
console.log('我是' + xiaoming.name + '，我来自' + xiaoming.nation + '。');
