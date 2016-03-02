/**
 * Created by Administrator on 2015/12/25.
 */
angular.module('myApp.services')
    .factory('userService',function($http){
        /*条件查询用户信息*/
        this.queryUserInfoByNameOrID = function(users) {
            return $http.get('/user/queryUserInfoByNameOrID', {
                params: {
                    users: JSON.stringify(users)
                }
            });
        };
        this.getAllUser = function(){
            return $http.get('/allUser');
        }
        return this;
    })