//一个不符合AMD规范的测试模块

//第一种写法
(function(window) {
    //为了避免冲突，要保存之前的同名全局名
    var _t = window.t;

    var test = {
        sum: 0
    }

    test.output = function() {
        return 'success';
    }

    //这种写法定义了全局变量t来代替整个变量名test，为了避免冲突，需要noConflict()函数来解决冲突
    test.noConflict = function() {
        window.t = _t;
        return test;
    }

    //向全局注册变量名
    window.t = test;
})(window);


//第二种写法
/*var test = (function() {
    var sum = 0;
    var output = function() {
        return 'success';
    }

    //必须将所有参数返回
    return {
        sum: sum,
        output: output
    }
})();*/