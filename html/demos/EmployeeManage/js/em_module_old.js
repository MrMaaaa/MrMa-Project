angular.module('manage', ['ngRoute'])
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
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/EmployeeInfo', {
                templateUrl: 'page/EmployeeInfo.html',
                controller: employeeInfoCtrl
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

//判断上一页与下一页的按钮是否允许点击
function judgeDisabled(lastIndex) {
    var $active = $('#pagination .pagination .active'); //当前选中的分页按钮
    var $prev = $('#pagination .pagination .prev'); //按钮：上一页
    var $next = $('#pagination .pagination .next'); //按钮：下一页
    //如果该分页按钮不是第一个
    if ($active.index() != 1) {
        $prev.removeClass('disabled');
    } else {
        //如果该分页按钮是第一个
        $prev.addClass('disabled');
    }

    //如果该分页按钮不是最后一个
    if ($active.index() != lastIndex) {
        $next.removeClass('disabled');
    } else {
        //如果该分页按钮是最后一个
        $next.addClass('disabled');
    }
};

//点击员工管理下属按钮显示不同内容
$('#manageList li').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('#typeName').text($(this).text());
    $('#mainPanel .typePanel').eq($(this).index()).removeClass('hide').siblings('.typePanel').addClass('hide');
});