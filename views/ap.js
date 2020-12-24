




// var app=angular.module("MyApp", []);
// app.controller("MyController",function($scope, $http){
//     $scope.pageMessage=null;
    
//     $http.get("http://localhost:3003/prospect/all").success(function(data){
//         $scope.pageMessage=data;
//     }).error(function(err){
//         console.log(err)
//     })
// })
  

var MyApp = angular.module('MyApp', []);
    
MyApp.controller('MyController', function($scope, $http) {                    
    $http({
            method: 'GET',
            url: 'http://localhost:3003/prospect/all'
        })
        .then(function successCallback(response) {
            $scope.sessions = response.data;
        }, function errorCallback(response) {
            console.log('Un problème est survenu.');
        });       
});
