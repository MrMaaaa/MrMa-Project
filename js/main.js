require.config({
    baseUrl: 'js',
    paths: {
        //可传入多个地址，一般为CDN与本地资源
        'jquery': ['jquery-3.1.0.min'],
        'Mutils': 'Mutils',
        'testNoAMD': 'testNoAMD',
        'testAMD': 'testAMD'
    },
    //为非AMD规范的模块定义特征（shim）
    shim: {
        //模块名
        'testNoAMD': {
            //依赖
            deps: [],
            //输出的变量名（即外部调用时的名称），注意此变量名必须与模块全局变量名一致，并且必须将所有方法名作为对象返回
            exports: 't'

        },
        'Mutils': {
            deps: [],
            //当 exports 与 init 同时存在的时候，exports将被忽略
            init: function() {
                //用来接收Mutils模块中的多个全局变量，注意：如果在Array、Math等对象上扩展方法则无需写在return对象中
                return {
                    random_int: random_int,
                    extend: extend
                }
            }
        }
    }
});

//如果A模块依赖于B模块，A模块不符合AMD规范(使用的是全局变量)，那么B模块也必须是使用全局变量，否则会报错。

//这个例子用来说明非AMD规范与符合AMD规范的模块的引用
require(['jquery', 'testNoAMD', 'testAMD', 'Mutils'], function($, t, a, m) {
    $('h1').text(2);
    console.log(t.output());
    console.log(t.sum);

    console.log(a.output());
    console.log(a.sum);

    console.log(m.random_int(1, 10));
    console.log(Math.randomPro(1, 10));
});
