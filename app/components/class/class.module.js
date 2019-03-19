var host = 'http://localhost:8000';

angular.module('StudentManagerApp.class', ['angularUtils.directives.dirPagination'])
    .controller('classController', function ($scope, $http) {

        //Load data function
        var loadData = function () {
            $http({
                method: 'GET',
                url: host + "/api/APIClassStudents"
            }).then(function (response) {
                var dl = response.data;
                console.log(dl);
                $scope.ClassStudents = dl;

            });
        }
        loadData();
        //Get Grades and Classes
        $http({
            method: 'GET',
            url: host + "/api/APIGrades"
        }).then(function (response) {
            var dl = response.data;
            $scope.Grades = dl;
            $scope.chooseGrade = function () {
                console.log($scope.search.Class.GradeId)
                var id = $scope.search.Class.GradeId;


                //console.log($scope.item);
                $http({
                    method: 'GET',
                    url: host + "/api/APIClasses/GetByGrade?GradeId=" + id
                }).then(function (response) {
                    var dl = response.data;
                    $scope.Classes = dl;
                })
            }
        });

        //Event click button Update
        $scope.updateEvent = function (student, index) {
            //console.log(student);
            $scope.mode = [];
            $scope.mode[index] = "editor";

        }

        //Event click button Cancel
        $scope.cancelEvent = function (index) {
            $scope.mode = [];
            $scope.mode[index] = "";
            loadData();
        }

        //Event click button Save
        $scope.saveUpdate = function (student, index) {
            console.log(student);
            $http({
                method: 'PUT',
                url: host + '/api/APIStudents/Put',
                data: student.Student
            }).then(function (response) {
                alert("Edit success!");
                $scope.mode = [];
                $scope.mode[index] = "";
                loadData();
            })
        }

        //Event click button Delete
        $scope.deleteEvent = function (student) {
            var deleteConfirm = confirm("Are you sure to delete student: " + student.Student.StudentName + ", Class: " + student.Class.ClassName);
            if (deleteConfirm == true) {
                console.log(1);
                $http({
                    method: 'DELETE',
                    url: host + "/api/APIClassStudents/Delete?ClassId=" + student.ClassId + "&StudentId=" + student.StudentId
                }).then(function (response) {
                    alert("Delete success!");
                    loadData();
                });
            } else {

            }
        }

        //Event click CreateClass button
        $scope.createClass = function (NewClass) {
            console.log(NewClass);
            $http({
                method: 'POST',
                url: host + "/api/APIClasses/Post",
                data: NewClass
            }).then(function (response) {
                alert("Add success!");
                $scope.createModel = false;
            })
        }

        //Event click Add new Student button
        $scope.createStudent = function (NewStudent) {
            //console.log(NewStudent);
            console.log(NewStudent);
            console.log(ClassId)

            var student = {
                StudentName: NewStudent.StudentName,
                StudentDoB: NewStudent.StudentDoB,
                StudentAddress: NewStudent.StudentAddress,
                StudentEmail: NewStudent.StudentEmail,
                StudentGender: NewStudent.StudentGender
            }
            var ClassId = NewStudent.ClassId;
            $http({
                method: "POST",
                url: host + "/api/APIStudents/CreateStudent",
                data: student
            }).then(function (response) {
                StudentId = response.data;
                var cls_std = {
                    StudentId: StudentId,
                    ClassId: parseInt(ClassId)
                }
                $http({
                    method: "POST",
                    url: host + "/api/APIClassStudents/AddStudentToClass",
                    data: cls_std
                }).then(function (response) {
                    alert("Add students: " + student.StudentName + "to class: " + ClassId + " success!")
                    $('#createStudent').modal('hide');
                    loadData();
                })


            })
        }

        $scope.changeClassTrigger = function () {
            $scope.listStdTable = $scope.ClassStudents.filter(student => student.selected);
            $scope.deleteRowTableChangeClassModal = function (index) {
                //console.log($scope.listStdTable);
                $scope.listStdTable.splice(index, 1);
            }
            $scope.changeClass = function (ChangeClass) {
                console.log(1);
                console.log(ChangeClass);
                var newCls = ChangeClass.ClassId;
                var listStd = $scope.listStdTable;
                $http({
                    method: "POST",
                    url: host + "/api/APIClassStudents/ChangeClass",
                    data: {
                        Students: listStd,
                        ClassId: parseInt(newCls)
                    }
                }).then(function (response) {
                    alert("Change class success!");
                    $('#changeClass').modal('hide');
                    loadData();
                })
            }


            //Event click ChangeClass buttnd


            // $scope.listStdTable = $scope.ClassStudents.filter(student => student.selected);

        }

    })
