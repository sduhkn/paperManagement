/**
 * Created by Administrator on 2015/12/10.
 */
angular.module('myApp.directives').directive('selectSth',[function(){
    return {
        restrict: 'EA',
        templateUrl: './myModules/SelectSth/selectSth.html',
        replace: true,
        transclude:true,
        scope: {
            error: '=error',
            myData: '=myData',
            queryFun: '&queryFun',
            transFun: '&transFun' //����Ǹ��� �󶨺���ʱ �� &
        },
    }
}]);
