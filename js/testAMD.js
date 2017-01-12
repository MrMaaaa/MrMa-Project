//一个符合AMD规范的测试模块

define(function() {
    var _sum = 1;
    var _output = function() {
        return 'success!';
    }

    //必须将所有参数返回
    return {
        output: _output,
        sum: _sum
    }
});

//如果这个模块依赖其他模块写法为
/*
define(['jquery'], function($) {
    //some code...
});
*/