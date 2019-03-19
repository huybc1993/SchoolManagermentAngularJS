angular.module('StudentManagerApp',['ui.router','StudentManagerApp.header','StudentManagerApp.class'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: "app/components/home/home.html"
    }).state('class',{
        url: '/class',
        templateUrl: "app/components/class/class.html"
    }).state('student',{
        url: '/student',
        templateUrl: "app/components/student/student.html"
    }).state('subject',{
        url: '/subject',
        templateUrl: "app/components/subject/subject.html"
    });
});
