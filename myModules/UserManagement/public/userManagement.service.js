/**
 * Created by Administrator on 2015/12/25.
 */
angular.module('myApp.services')
    .factory('userService',function($http){
        /*������ѯ�û���Ϣ*/
        var queryUserInfoByNameOrID = function(users) {
            return $http.get('/user/queryUserInfoByNameOrID', {
                params: {
                    users: JSON.stringify(users)
                }
            });
        }

        return {
            queryUserInfoByNameOrID: queryUserInfoByNameOrID,
        }
    })