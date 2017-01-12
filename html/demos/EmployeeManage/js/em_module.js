angular.module('manage', ['ngRoute'])
    .controller('employeeMain', employeeMainCtrl)
    .controller('employeeInfo', employeeInfoCtrl)
    .controller('employeeSearch', employeeSearchCtrl)
    .controller('employeeSendMsg', sendMessageCtrl)
    .directive('onFinishRenderFilters', function($timeout) {
        return {
            //监听数据是否读取完毕
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        //给父控制器传入参数
                        scope.$emit('ngRepeatFinished');
                        //给子控制器传入参数
                        //scope.$broadcast('ngRepeatFinished');
                    });
                }
            }
        }
    })
    .service('commonService', function() {
        this.getData = function(data, page, num, filter) {
            // 对从ajax获取到的数据进行处理
            // data: 需要处理的数据（数组），page: 页数（值为-1时获取全部数据），num: 每页的数据，filter: 过滤内容
            var data = data.concat();

            if (!filter) {
                //不进行过滤
                if (page != -1) {
                    data = data.splice((page - 1) * num, num);
                }

                return data;
            } else {
                //进行过滤
                var filterData = [];

                //循环查询
                for (var i = 0; i < data.length; i++) {
                    if (filter.filterContent == data[i][filter.filterType]) {
                        filterData.push(data[i]);
                    }
                }

                if (filterData.length == 0) {
                    filterData.push({
                        "num": "no data",
                        "name": "no data",
                        "sex": "no data",
                        "age": "no data",
                        "email": "no data",
                        "phone": "no data",
                        "salary": "no data"
                    });
                }
                if (page != -1) {
                    filterData = filterData.splice((page - 1) * num, num);
                }

                return filterData;
            }
        }

        this.judgeDisabled = function() {
            //判断上一页与下一页的按钮是否允许点击
            var $prev = $('#pagination .pagination .prev'); //按钮：上一页
            var $next = $('#pagination .pagination .next'); //按钮：下一页

            if ($('#pagination .pagination li').length <= 3) {
                //如过分页按钮少于3个（即不到1个分页），则两个按钮均不可点击
                $prev.addClass('disabled');
                $next.addClass('disabled');
            } else {
                var $active = $('#pagination .pagination .active'); //当前选中的分页按钮

                //如果当前分页按钮前一个按钮是上一页
                if ($active.prev().hasClass('prev')) {
                    $prev.addClass('disabled');
                } else {
                    //否则
                    $prev.removeClass('disabled');
                }

                //如果当前分页按钮后一个按钮是下一页
                if ($active.next().hasClass('next')) {
                    $next.addClass('disabled');
                } else {
                    //如果该分页按钮是最后一个
                    $next.removeClass('disabled');
                }
            }
        }

        this.getPageSum = function(data, num) {
            return Math.ceil(data.length / num);
        }

        this.insertPageBtn = function(pageSum) {
            //删除已有分页按钮
            $('#pagination .pagination li:not(.noIndex)').remove();
            //第一页为选中状态
            $('#pagination .pagination .next').before('<li class="active"><a href="javascript:void(null)">1</a></li>');
            //如果有第二页
            if (pageSum > 1) {
                //插入第一页之后的其他标签
                for (var i = 1; i < pageSum; i++) {
                    //根据分页数目插入对应数目的标签
                    $('#pagination .pagination .next').before('<li><a href="javascript:void(null)">' + (i + 1) + '</a></li>');
                }
            }

            //判断上一页下一页按钮是否允许点击
            this.judgeDisabled();

            return true;
        }

        this.bindPageClick = function(pageSum, getData) {
            //getData：数据读取函数
            //绑定分页按钮点击事件
            var that = this;
            $('#pagination .pagination li:not(.noIndex)').click(function() {
                //如果点击的分页按钮没有被选中
                if (!$(this).hasClass('active')) {
                    //获取该按钮JQ对象
                    var $this = $(this);
                    //选中该按钮
                    $this.addClass('active').siblings().removeClass('active');
                    //根据切换的分页按钮获取数据
                    getData();

                    //判断上一页下一页按钮是否允许点击
                    that.judgeDisabled();
                }
            });
        }

        this.bindPNClick = function(pageSum, getData) {
            //getData：数据读取函数
            //按钮：翻页按钮点击事件
            //首先取消绑定点击事件
            var that = this;
            $('#pagination .pagination .noIndex').unbind('click');
            $('#pagination .pagination .noIndex').click(function() {
                //如果可以点击
                if (!$(this).hasClass('disabled')) {
                    //获取点击前被选中的分页按钮
                    var $preActiveBtn = $('#pagination .pagination .active');
                    //分页按钮样式切换
                    if ($(this).hasClass('prev')) {
                        //按钮是上一页时
                        $preActiveBtn.prev().addClass('active').siblings().removeClass('active');
                    } else if ($(this).hasClass('next')) {
                        //按钮是下一页时
                        $preActiveBtn.next().addClass('active').siblings().removeClass('active');
                    }

                    //根据切换的分页按钮获取数据
                    getData();

                    //判断上一页下一页按钮是否允许点击
                    that.judgeDisabled();
                }
            });
        }

        this.toggleCheckbox = function(num, obj) {
            //num: 数据的value ,obj切换选中状态的checkbox的jq对象
            if (obj) {
                if (obj.attr('checked')) {
                    obj.removeAttr('checked');
                } else {
                    obj.attr('checked', 'checked');
                }
            } else {
                $('tr.receiverInfo').each(function() {
                    if ($(this).attr('value') == num) {
                        var obj = $(this).find('input[type="checkbox"]');
                        if (obj.attr('checked', 'checked')) {
                            obj.removeAttr('checked');
                        } else {
                            obj.attr('checked', 'checked');
                        }
                    }
                });
            }
        }
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/EmployeeInfo', {
                templateUrl: 'page/EmployeeInfo.html'
            })
            .when('/EmployeeSearch', {
                templateUrl: 'page/EmployeeSearch.html'
            })
            .when('/SendMessage', {
                templateUrl: 'page/SendMessage.html'
            })
            .otherwise({

            });
    }]);

//点击员工管理下属按钮显示不同内容
$('#manageList li').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active');
        $('#typeName').text($(this).text());
        $('#mainPanel .typePanel').eq($(this).index()).removeClass('hide').siblings('.typePanel').addClass('hide');

        //收起侧边栏
        $('#sendMsgSet').animate({
            right: '-350px'
        });

        //清空分页按钮
        $('#pagination .pagination li:not(.noIndex)').remove();
    }
});
