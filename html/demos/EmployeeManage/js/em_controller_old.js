function employeeInfoCtrl($scope, $http) {
    $scope.employeeData = []; //页面显示数据
    $scope.getData = []; //从json中读取到的数据
    $scope.pageSum; //分页数目
    $scope.pageDataSum = 10; //每页显示数据个数

    function getData(page, num, callback) {
        //传入参数：页数，每页数据总数， 回调
        var page = parseInt(page);
        var num = parseInt(num);
        $http.get('./employee.json').success(function(data) {
            if (page !== -1) {
                // 如果传入参数为-1获取整个数据
                $scope.getData = data.employee.splice((page - 1) * num, num);
            } else {
                $scope.getData = data.employee;
            }

            if (typeof callback == 'function') {
                callback();
            }
        });
    };

    //每次读取json数据并将$scope.getData赋值为指定的数据
    //收起侧边栏
    $('#sendMsgSet').animate({
        right: '-350px'
    });
    //获取分页数目，插入相应数目按钮，按钮绑定
    getData('-1', 0, function() {
        //获取分页数目
        if ($scope.getData.length % 10 === 0) {
            $scope.pageSum = parseInt($scope.getData.length / 10);
        } else {
            $scope.pageSum = parseInt($scope.getData.length / 10) + 1;
        }

        //如果分页数目大于1，允许点击下一页按钮
        if ($scope.pageSum > 1) {
            $('#pagination .pagination .next').removeClass('disabled');
        }

        //首先清除按钮
        $('#pagination .pagination li').remove('li:not([class*="prev"]):not([class*="next"])');

        //根据分页数目插入对应数目的标签
        for (var i = 0; i < $scope.pageSum; i++) {
            //根据分页数目插入对应数目的标签
            if (i === 0) {
                $('#pagination .pagination .next').before('<li class="active"><a href="javascript:void(null)">' + (i + 1) + '</a></li>');
            } else {
                $('#pagination .pagination .next').before('<li><a href="javascript:void(null)">' + (i + 1) + '</a></li>');
            }
        }

        judgeDisabled($scope.pageSum);

        // 当点击不同页数时
        $('#pagination .pagination li:not([class~="noIndex"])').click(function() {
            $(this).addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            getData($(this).text(), $scope.pageDataSum, function() {
                $scope.employeeData = $scope.getData;
            });
        });
    });

    // 默认加载第一页数据
    getData(1, $scope.pageDataSum, function() {
        $scope.employeeData = $scope.getData;
    });

    //按钮：上一页点击事件
    $('#pagination .pagination .prev').click(function() {
        //如果可以点击
        if (!$(this).hasClass('disabled')) {
            //分页按钮样式切换
            $('#pagination .pagination .active').prev().addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            //根据切换的分页按钮获取数据
            getData($('#pagination .pagination .active').text(), $scope.pageDataSum, function() {
                $scope.employeeData = $scope.getData;
            });
        }
    });

    //按钮：下一页点击事件
    $('#pagination .pagination .next').click(function() {
        //如果可以点击
        if (!$(this).hasClass('disabled')) {
            //分页按钮样式切换
            $('#pagination .pagination .active').next().addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            //根据切换的分页按钮获取数据
            getData($('#pagination .pagination .active').text(), $scope.pageDataSum, function() {
                $scope.employeeData = $scope.getData;
            });
        }
    });
}

function employeeSearchCtrl($scope, $http) {
    $scope.employeeData = []; //页面显示数据
    $scope.pageSum; //分页数目
    $scope.pageDataSum = 10; //每页显示数据
    $scope.searchAttr = $('#searchType').attr('name'); //搜索属性
    $scope.searchVal = $('#searchContent').val(); //搜索内容

    //声明获取数据函数
    function getData(page, callback) {
        //清空数据源
        $scope.employeeData = [];
        $http.get('./employee.json').success(function(data) {
            for (var i = 0; i < data.employee.length; i++) {
                //循环整个json数据，如果内容匹配，将该条数据插入$scope.employeeData数组中
                if (data.employee[i][$scope.searchAttr].toLowerCase() == $scope.searchVal.toLowerCase()) {
                    $scope.employeeData.push(data.employee[i]);
                }
            }

            //如果未查询到数据，插入no data数据
            if ($scope.employeeData.length == 0) {
                $scope.employeeData = [{
                    num: 'no data',
                    name: 'no data',
                    sex: 'no data',
                    age: 'no data',
                    email: 'no data',
                    phone: 'no data',
                    salary: 'no data'
                }];
            }

            //如果page=-1表示获取全部数据
            if (page != '-1') {
                $scope.employeeData = $scope.employeeData.splice((parseInt(page) - 1) * $scope.pageDataSum, $scope.pageDataSum);
            }

            //执行回调函数
            if (callback) {
                callback();
            }
        });
    }

    //收起侧边栏
    $('#sendMsgSet').animate({
        right: '-350px'
    });

    //首先清除按钮
    $('#pagination .pagination li').remove('li:not([class*="prev"]):not([class*="next"])');

    //如果切换了查询属性切换显示名称
    $('#searchList li').click(function() {
        $('#searchType').html($(this).text() + ' <span class="caret"></span>').attr('name', $(this).attr('name'));
    });

    //进行查询事件处理
    //当点击查询按钮时
    $('#btnSearch').click(function() {
        //获取查询的数据属性
        $scope.searchAttr = $('#searchType').attr('name');
        //获取查询数据内容
        $scope.searchVal = $('#searchContent').val();

        //获取json数据进行内容匹配
        getData(-1, function() {
            //根据查询到的个数设置分页按钮个数
            if ($scope.employeeData.length % 10 === 0) {
                $scope.pageSum = parseInt($scope.employeeData.length / 10);
            } else {
                $scope.pageSum = parseInt($scope.employeeData.length / 10) + 1;
            }

            //如果分页按钮数目大于1，允许点击下一页
            if ($scope.pageSum > 1) {
                $('#pagination .pagination .next').removeClass('disabled');
            }

            //获取前十条数据
            getData(1);

            //清除按钮
            $('#pagination .pagination li').remove('li:not([class~="noIndex"])');

            //根据分页数目插入对应数目的标签
            for (var i = 0; i < $scope.pageSum; i++) {
                //根据分页数目插入对应数目的标签
                if (i === 0) {
                    $('#pagination .pagination .next').before('<li class="active"><a href="javascript:void(null)">' + (i + 1) + '</a></li>');
                } else {
                    $('#pagination .pagination .next').before('<li><a href="javascript:void(null)">' + (i + 1) + '</a></li>');
                }
            }

            // 分页按钮绑定切换数据函数
            $('#pagination .pagination li:not([class~="noIndex"])').click(function() {
                $(this).addClass('active').siblings().removeClass('active');

                judgeDisabled($scope.pageSum);

                getData($(this).text(), $scope.employeeData);
            });
        });
    });

    //按钮：上一页点击事件
    $('#pagination .pagination .prev').click(function() {
        //如果可以点击
        if (!$(this).hasClass('disabled')) {
            //分页按钮样式切换
            $('#pagination .pagination .active').prev().addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            //根据切换的分页按钮获取数据
            getData(parseInt($('#pagination .pagination .active').text()));
        }
    });

    //按钮：下一页点击事件
    $('#pagination .pagination .next').click(function() {
        //如果可以点击
        if (!$(this).hasClass('disabled')) {
            //分页按钮样式切换
            $('#pagination .pagination .active').next().addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            //根据切换的分页按钮获取数据
            getData(parseInt($('#pagination .pagination .active').text()));
        }
    });
}

function sendMessageCtrl($scope, $http) {
    $scope.employeeData = []; //页面显示数据
    $scope.getData = []; //getData函数改变的数据
    $scope.pageSum; //分页数目
    $scope.pageDataSum = 10; //每页显示数据个数

    function getData(page, num, callback) {
        //传入参数：页数，每页数据总数， 回调
        var page = parseInt(page);
        var num = parseInt(num);
        $http.get('./employee.json').success(function(data) {
            if (page != '-1') {
                // 如果传入参数为-1获取整个数据
                $scope.getData = data.employee.splice((page - 1) * num, num);
            } else {
                $scope.getData = data.employee;
            }

            if (typeof callback == 'function') {
                callback();
            }
        });
    };

    //切换分页后根据已添加列表判断check是否勾上
    function judgeCheck() {
        var asideTr = $('#sendMsgSet .receiverList tr[value]');
        $('tr.receiverInfo').each(function() {
            for (var i = 0; i < asideTr.length; i++) {
                if ($(this).attr('value') == asideTr.eq(i).attr('value')) {
                    $(this).find('td:first-child input').attr('checked', 'checked');
                }
            }
        });
    };

    //监听参数判断数据是否读取完毕
    $scope.$on('ngRepeatFinished', function() {
        //每次刷新列表根据侧边栏数据给checkbox加上选中状态
        judgeCheck();

        //点击数据行或多选框触发添加/删除该收件人事件
        $('#mainPanel .typePanel .receiverInfo').click(function() {
            //如果侧栏没有弹出
            if ($('#sendMsgSet').css('right') != 0) {
                //弹出侧栏
                $('#sendMsgSet').animate({
                    right: '0'
                });
            }

            //获取checkbox
            var $thisCheck = $(this).find('input.selectReceiver');

            //如果已经选中
            if ($thisCheck.attr('checked')) {
                $thisCheck.removeAttr('checked');

                //移除选中的收件人姓名
                $('#sendMsgSet > table.receiverList tr[value=' + $(this).attr('value') + ']').remove();

                //计数减1
                $('#receiverNum').text(function(index, before) {
                    return parseInt(before) - 1;
                });
            } else {
                //如果未被选中
                $thisCheck.attr('checked', 'checked');

                //添加选中的收件人姓名
                $('#sendMsgSet > table.receiverList').append('<tr value="' + $(this).attr('value') + '"><td><button class="btn btn-danger btn-sm" type="button">删除</button></td><td>' + $(this).find('td:nth-child(3)').text() + '</td><td>' + $(this).attr('value') + '</td></tr>');

                //计数加1
                $('#receiverNum').text(function(index, before) {
                    return parseInt(before) + 1;
                });
            }

            //点击删除按钮删除该收件人
            //jquery绑定click事件会导致连续触发问题
            /*$('#sendMsgSet table.receiverList tr td button').click(function() {
                console.log($(this).parent().next());

                //删除该条数据
                $(this).parent().parent().remove();

                //checkbox取消选中
                $thisCheck.removeAttr('checked');

                //计数减1
                $('#receiverNum').text(function(index, before) {
                    return parseInt(before) - 1;
                });

                //判断此时是否有数据，如果无内容则弹回侧边栏
                if ($('#receiverNum').text() == 0) {
                    $('#sendMsgSet').animate({
                        right: '-350px'
                    });
                };
            });*/
            $('#sendMsgSet .receiverList tr td button.btn-danger').each(function() {
                $(this).get(0).onclick = function() {
                    //checkbox取消选中
                    $('#mainPanel .typePanel .receiverInfo[value=' + $(this).parent().parent().attr('value') + ']').find('td:first-child input').removeAttr('checked');

                    //删除该条数据
                    $(this).parent().parent().remove();

                    //计数减1
                    $('#receiverNum').text(function(index, before) {
                        return parseInt(before) - 1;
                    });

                    //判断此时是否有数据，如果无内容则弹回侧边栏
                    if ($('#receiverNum').text() == 0) {
                        $('#sendMsgSet').animate({
                            right: '-350px'
                        });
                    };
                };
            });

            //如果无内容则弹回侧边栏
            if ($('#receiverNum').text() == 0) {
                $('#sendMsgSet').animate({
                    right: '-350px'
                });
            };
        });
    });

    //每次读取json数据并将$scope.getData赋值为指定的数据
    //获取分页数目，插入相应数目按钮，按钮绑定
    getData('-1', 0, function() {
        //获取分页数目
        if ($scope.getData.length % 10 === 0) {
            $scope.pageSum = parseInt($scope.getData.length / 10);
        } else {
            $scope.pageSum = parseInt($scope.getData.length / 10) + 1;
        }

        //如果分页数目大于1，允许点击下一页按钮
        if ($scope.pageSum > 1) {
            $('#pagination .pagination .next').removeClass('disabled');
        }

        //首先清除按钮
        $('#pagination .pagination li').remove('li:not([class*="prev"]):not([class*="next"])');

        //根据分页数目插入对应数目的标签
        for (var i = 0; i < $scope.pageSum; i++) {
            //根据分页数目插入对应数目的标签
            if (i === 0) {
                $('#pagination .pagination .next').before('<li class="active"><a href="javascript:void(null)">' + (i + 1) + '</a></li>');
            } else {
                $('#pagination .pagination .next').before('<li><a href="javascript:void(null)">' + (i + 1) + '</a></li>');
            }
        }

        judgeDisabled($scope.pageSum);

        // 分页按钮绑定切换数据函数
        $('#pagination .pagination li:not([class~="noIndex"])').click(function() {
            $(this).addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            //获取数据
            getData($(this).text(), $scope.pageDataSum, function() {
                $scope.employeeData = $scope.getData;
            });
        });
    });

    // 默认加载第一页数据
    getData(1, $scope.pageDataSum, function() {
        $scope.employeeData = $scope.getData;
    });

    //按钮：上一页点击事件
    $('#pagination .pagination .prev').click(function() {
        //如果可以点击
        if (!$(this).hasClass('disabled')) {
            //分页按钮样式切换
            $('#pagination .pagination .active').prev().addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            //根据切换的分页按钮获取数据
            getData($('#pagination .pagination .active').text(), $scope.pageDataSum, function() {
                $scope.employeeData = $scope.getData;
            });
        }
    });

    //按钮：下一页点击事件
    $('#pagination .pagination .next').click(function() {
        //如果可以点击
        if (!$(this).hasClass('disabled')) {
            //分页按钮样式切换
            $('#pagination .pagination .active').next().addClass('active').siblings().removeClass('active');

            judgeDisabled($scope.pageSum);

            //根据切换的分页按钮获取数据
            getData($('#pagination .pagination .active').text(), $scope.pageDataSum, function() {
                $scope.employeeData = $scope.getData;
            });
        }
    });
}