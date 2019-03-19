angular.module('StudentManagerApp.header',['ui.router'])
.controller('headerControllerRouter', function($scope,$state){
    $scope.classRouter = function(){
        $state.go('class');
    }
    $scope.studentRouter = function(){
        console.log(1);
        $state.go('student');
    }
    $scope.subjectRouter = function(){
        console.log(2);
        $state.go('subject');
    }
});