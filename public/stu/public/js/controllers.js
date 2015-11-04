/**
 * Created by Administrator on 2015/10/28.
 * angular stuController
 */
angular.module('myApp.controllers')
    .controller('stuController',function($scope, $cookies, $state){
        $scope.user = $cookies.userID;
        $scope.$state = $state;
    }).controller('stu_showPaperInfoController',function($scope, $window, stuService){
        /*showMyPaper.html controller*/
        stuService.getPaperInfo()
            .success(function(data){
                if(data)
                    $scope.paperInfo = data.paperInfo;
            });
        $scope.editPaper = function (paper) {
            $window.sessionStorage.setItem('paper',JSON.stringify(paper));
        };
    })
    .controller('editPaperController',function($scope, $window, $state){
        if($window.sessionStorage.getItem('paper')){
            var editPaperInfo = JSON.parse($window.sessionStorage.getItem('paper'));
            $scope.paper = editPaperInfo;
            $scope.paper.pubdate = new Date(editPaperInfo.pubdate);
        }else {
            $state.go('showMyPaper');
        }
    });