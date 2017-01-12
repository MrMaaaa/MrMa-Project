function employeeMainCtrl($rootScope) {
    //每页显示数据个数
    $rootScope.pageDataSum = 10;
}

function employeeInfoCtrl($scope, $rootScope, $http, commonService) {
    $scope.employeeData = []; //页面显示数据
    $scope.pageSum; //分页数目

    //当点击该view时，通过ajax获取数据
    $http({
        method: 'GET',
        url: './employee.json'
    }).success(function(data) {
        //将获取到的数据进行处理，获取第一页的数据
        $scope.employeeData = commonService.getData(data.employee, 1, $rootScope.pageDataSum);

        //获取数据需要的总页数
        $scope.pageSum = commonService.getPageSum(data.employee, $rootScope.pageDataSum);

        //根据分页数目插入对应数目的标签
        commonService.insertPageBtn($scope.pageSum);

        //按钮：分页按钮点击事件
        commonService.bindPageClick($scope.pageSum, function() {
            $http({
                method: 'GET',
                url: './employee.json'
            }).success(function(data) {
                //将获取到的数据进行处理，获取当前分页的数据
                $scope.employeeData = commonService.getData(data.employee, $('#pagination .pagination li.active').text(), $rootScope.pageDataSum);
            });
        });
    });

    //绑定翻页按钮点击事件
    commonService.bindPNClick($scope.pageSum, function() {
        $http({
            method: 'GET',
            url: './employee.json'
        }).success(function(data) {
            //将获取到的数据进行处理，获取当前分页的数据
            $scope.employeeData = commonService.getData(data.employee, $('#pagination .pagination li.active').text(), $rootScope.pageDataSum);
        });
    });
}

function employeeSearchCtrl($scope, $rootScope, $http, commonService) {
    $scope.employeeData = []; //页面显示数据
    $scope.pageSum; //分页数目
    $scope.searchType;
    $scope.searchContent;

    commonService.judgeDisabled();

    //切换查找类型改变按钮显示文字
    $('#searchList li.presentation').click(function() {
        $('#searchType').attr('name', $(this).attr('name'));
        $('#searchType').html($(this).text() + ' <span class="caret"></span>');
    });

    //点击查询按钮
    $scope.searchData = function() {
        //获取查询类型与查询内容
        $scope.searchType = $('#searchType').attr('name');
        $scope.searchContent = $('#searchContent').val();

        //当点击该view时，通过ajax获取数据
        $http({
            method: 'GET',
            url: './employee.json'
        }).success(function(data) {
            $scope.employeeData = commonService.getData(data.employee, -1, $rootScope.pageDataSum, {
                filterType: $scope.searchType,
                filterContent: $scope.searchContent
            });

            //获取数据需要的总页数
            $scope.pageSum = commonService.getPageSum($scope.employeeData, $rootScope.pageDataSum);

            //根据分页数目插入对应数目的标签
            commonService.insertPageBtn($scope.pageSum);

            //按钮：分页按钮点击事件
            commonService.bindPageClick($scope.pageSum, function() {
                $http({
                    method: 'GET',
                    url: './employee.json'
                }).success(function(data) {
                    //将获取到的数据进行处理，获取当前分页的数据
                    $scope.employeeData = commonService.getData(data.employee, $('#pagination .pagination li.active').text(), $rootScope.pageDataSum, {
                        filterType: $scope.searchType,
                        filterContent: $scope.searchContent
                    });
                });
            });
        });

        //绑定翻页按钮点击事件
        commonService.bindPNClick($scope.pageSum, function() {
            $http({
                method: 'GET',
                url: './employee.json'
            }).success(function(data) {
                //将获取到的数据进行处理，获取当前分页的数据
                $scope.employeeData = commonService.getData(data.employee, $('#pagination .pagination li.active').text(), $rootScope.pageDataSum, {
                    filterType: $scope.searchType,
                    filterContent: $scope.searchContent
                });
            });

        });
    };
}

function sendMessageCtrl($scope, $rootScope, $http, commonService) {
    $scope.employeeData = []; //页面显示数据
    $scope.selectData = []; //右侧列表选中数据
    $scope.pageSum; //分页数目

    commonService.judgeDisabled();

    //当点击该view时，通过ajax获取数据
    $http({
        method: 'GET',
        url: './employee.json'
    }).success(function(data) {
        //将获取到的数据进行处理，获取第一页的数据
        $scope.employeeData = commonService.getData(data.employee, 1, $rootScope.pageDataSum);

        //获取数据需要的总页数
        $scope.pageSum = commonService.getPageSum(data.employee, $rootScope.pageDataSum);

        //根据分页数目插入对应数目的标签
        commonService.insertPageBtn($scope.pageSum);

        //按钮：分页按钮点击事件
        commonService.bindPageClick($scope.pageSum, function() {
            $http({
                method: 'GET',
                url: './employee.json'
            }).success(function(data) {
                //将获取到的数据进行处理，获取当前分页的数据
                $scope.employeeData = commonService.getData(data.employee, $('#pagination .pagination li.active').text(), $rootScope.pageDataSum);
            });
        });
    });

    //监听ng-repeat完成时添加点击事件
    $scope.$on('ngRepeatFinished', function() {
        //当点击每列数据时添加到右侧滑动栏
        //更新ng-repeat源数组$scope.selectData
        $scope.$apply();

        //根据侧边栏的数据给该数据checkbox添加选中状态
        for (var i = 0; i < $scope.selectData.length; i++) {
            $('.receiverInfo[value="' + $scope.selectData[i].num + '"]').find('input').attr('checked', 'checked');
        }
    });

    //点击数据列表时，弹出/隐藏侧边栏，同时更新数据
    $scope.addDataToAside = function($event, num) {
        var thisItem = $($event.target).parent();
        if (thisItem.find('input').attr('checked')) {
            //如果已经选中则取消选中
            thisItem.find('input').removeAttr('checked');

            //从数组中删除数据
            for (var i = 0; i < $scope.selectData.length; i++) {
                if ($scope.selectData[i].num == num) {
                    $scope.selectData.splice(i, 1);
                }
            }

            //显示信息数量减1
            $('#receiverNum').text(function(index, old) {
                return parseInt(old) - 1;
            });

            //如果此时数据为空则收起侧边栏
            if ($scope.selectData.length == 0) {
                $('#sendMsgSet').animate({
                    right: '-355px'
                });
            }
        } else {
            //选中数据
            thisItem.find('input').attr('checked', 'checked');

            //将数据插入数组中
            for (var i = 0; i < $scope.employeeData.length; i++) {
                if ($scope.employeeData[i].num == num) {
                    $scope.selectData.push($scope.employeeData[i]);
                }
            }

            //显示信息数量加1
            $('#receiverNum').text(function(index, old) {
                return parseInt(old) + 1;
            });

            //展开侧边栏
            if ($('#sendMsgSet').css('right') != '0' && $scope.selectData.length > 0) {
                $('#sendMsgSet').animate({
                    right: '0'
                });
            }
        }
    }

    //点击侧边栏删除按钮
    $scope.deleteDataFromAside = function(num) {
        //从数组中删除数据
        for (var i = 0; i < $scope.selectData.length; i++) {
            if ($scope.selectData[i].num == num) {
                $scope.selectData.splice(i, 1);
            }
        }

        //显示信息数量减1
        $('#receiverNum').text(function(index, old) {
            return parseInt(old) - 1;
        });

        //去除数据列表checkbox的选中状态
        $('.receiverInfo[value="' + num + '"]').find('input').removeAttr('checked');

        //如果此时数据为空则收起侧边栏
        if ($scope.selectData.length == 0) {
            $('#sendMsgSet').animate({
                right: '-355px'
            });
        }
    }

    //绑定翻页按钮点击事件
    commonService.bindPNClick($scope.pageSum, function() {
        $http({
            method: 'GET',
            url: './employee.json'
        }).success(function(data) {
            //将获取到的数据进行处理，获取当前分页的数据
            $scope.employeeData = commonService.getData(data.employee, $('#pagination .pagination li.active').text(), $rootScope.pageDataSum);
        });
    });
}
