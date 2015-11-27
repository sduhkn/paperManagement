/**
 * Created by Administrator on 2015/11/20.
 */
angular.module('myApp.directives',[]).directive('mypagination',[function(){
    //定义directive的名字时 例如myPagination  标签就要写my-pagination; 当标签名字为myPagination时，directive名字为mypagination
    //里面的属性 命名规则也如上
    return {
        restrict: 'EA',
        templateUrl: './myModules/Pagination/pagination.html',
        replace: true,
        scope:{
            conf: '=conf',
            loadData: '&loadData' //这边是个坑 绑定函数时 用 &
        },
        link: function(scope, element, attr){
            scope.pagers = function(){
                var pagerSize = scope.conf.pagerSize,
                    median = parseInt(pagerSize / 2),
                    max = scope.conf.totalPage,
                    cur = scope.conf.currentPage,
                    start = 1,
                    end = max,
                    sequence = [];
                if (max > pagerSize) {
                    if (cur <= median) {
                        end = pagerSize;
                    } else if (cur >= max - median) {
                        start = max - pagerSize + 1;
                    } else {
                        start = cur - median;
                        end = cur + median;
                    }
                }

                for (var i = start; i<= end; i++) {
                    sequence.push(i);
                }
                return sequence;
            };
            scope.next = function () {
                if (scope.conf.currentPage < scope.conf.totalPage) {
                    scope.conf.currentPage++;
                    scope.loadData();
                }
            };
            scope.prev = function () {
                if (scope.conf.currentPage > 1) {
                    scope.conf.currentPage--;
                    scope.loadData();
                }
            };
            scope.loadPage = function (page) {
                scope.conf.currentPage = page;
                scope.loadData();
            };
        },

    }
}]);