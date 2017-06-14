/**
 * Created by TejaswiniPulivarthi on 6/7/2017.
 */
var app=angular.module('COURSE', []);
app.controller('COURSECATLOG', function ($scope,$http) {
    var req = {
        headers: {
            'Authorization': 'Basic dGVzdHVzZXI6dGVzdDEyMw==',
            'companyID': 'N2N'
        }
    };
    $scope.getDept= function () {
        document.getElementById("div").style.display = 'block';
        document.getElementById("div1").style.display = 'none';
        document.getElementById("div2").style.display = 'none';
        document.getElementById("div3").style.display = 'none';
        $http.get(' https://sb-api.n2nintegration.com/illuminate/V1.0.0/SubjectList?illuminateApiKey=vWW7MTABZ5mkWxBJAIhP&TermCode=201710', req).success(function (data) {

            console.log(data);
            $scope.subject = new Array();
            for (var i = 0; i < 9; i++) {
                $scope.subject[i] = {
                    "subcode": data.entityList[i].SubjectCode,
                    "subdes": data.entityList[i].SubjectDescription

                };

            }

        });
    };

    $scope.getCourse= function (mn) {
        //var x=document.getElementById("search1").value;
        document.getElementById("div").style.display = 'none';
        document.getElementById("div1").style.display = 'block';


        $http.get('https://sb-api.n2nintegration.com/illuminate/V1.0.0/CourseAdvanceSearch?illuminateApiKey=vWW7MTABZ5mkWxBJAIhP&TermCode=201710&Subject='+mn.subcode, req).success(function (data) {
                console.log(data);
                //$scope.h=data.entityList[]
            $scope.cou = new Array();
            //$scope.len=Object.keys(data.entityList).length;
            for (var i = 0; i < 9; i++) {
                $scope.cou[i] = {
                    "crn": data.entityList[i].CourseRegistrationNumber,
                    "ct": data.entityList[i].CourseTitle,
                    "credits":data.entityList[i].Credits,
                    "sa":data.entityList[i].SeatsAvailable,
                    "md":data.entityList[i].MeetingDetails,
                    "des1":data.entityList[i].Description
                }
            }
            });
    };
    $scope.getCoursedet= function (courseno) {
        document.getElementById("div1").style.display = 'none';
        document.getElementById("div2").style.display = 'block';
        $http.get('https://sb-api.n2nintegration.com/illuminate/V1.0.0/CourseDetailSearch?illuminateApiKey=vWW7MTABZ5mkWxBJAIhP&TermCode=201710&CRN='+courseno.crn, req).success(function (data) {
            console.log(data);
            //$scope.h=data.entityList[]
            $scope.coud = new Array();
            for (var i = 0; i < 9; i++) {
                $scope.coud[i] = {
                    "ct": data.entityList[i].CourseTitle,
                    "fa": data.entityList[i].Faculty,
                    "seat": data.entityList[i].SeatsAvailable,
                    "seatsno": data.entityList[i].NoOfSeatsAvailable,
                    "TotalnoSeats" :data.entityList[i].TotalSeats,
                    "crn1":data.entityList[i].CourseRegistrationNumber,
                    "campus":data.entityList[i].Campus,
                    "wl":data.entityList[i].WaitList,
                    "des":data.entityList[i].Description
                }
            }
        });
    };
    $scope.postCart= function (cs){

        var re= $http({
            method: 'POST',
            url: 'https://sb-api.n2nintegration.com/illuminate/V1.1.0/AddToCart?illuminateApiKey=vWW7MTABZ5mkWxBJAIhP',
            headers: {
                'Authorization': 'Basic dGVzdHVzZXI6dGVzdDEyMw==',
                'companyID': 'N2N'
            },
            data: {p_studentid:"N2N000006", p_termcode:"201710", p_crn: cs.crn1 }
        }).success(function (data1) {

            alert(data1.response.p_status_msg);
            console.log(data1);

        }).error(function() {
            alert("something went wrong");
        });
    };

    $scope.dropCart= function (cs){

        var re= $http({
            method: 'POST',
            url: 'https://sb-api.n2nintegration.com/illuminate/V1.1.0/DropCart?illuminateApiKey=vWW7MTABZ5mkWxBJAIhP',
            headers: {
                'Authorization': 'Basic dGVzdHVzZXI6dGVzdDEyMw==',
                'companyID': 'N2N'
            },
            data: {p_studentid:"N2N000006", p_termcode:"201710", p_crn: cs.crn1 }
        }).success(function (data) {

            alert(data.response.p_status_msg);
            console.log(data);

        }).error(function() {
            alert("something went wrong");
        });
    };
    $scope.getCartInfo= function (stdid) {
        document.getElementById("div").style.display = 'none';
        document.getElementById("div1").style.display = 'none';
        document.getElementById("div2").style.display = 'none';
        document.getElementById("div3").style.display = 'block';
        $http.get(' https://sb-api.n2nintegration.com/illuminate/V1.1.0/CartInfo?illuminateApiKey=vWW7MTABZ5mkWxBJAIhP&StudentId=N2N000006&TermCode=201710', req).success(function (data) {
            console.log(data);
            //$scope.h=data.entityList[]
            $scope.cart = new Array();
            for (var i = 0; i < 9; i++) {
                $scope.cart[i] = {
                    "course": data.entityList[i].CourseTitle,
                    "cr2":data.entityList[i].CourseRegistrationNumber,
                    "sa1":data.entityList[i].SeatsAvailable,
                    "td":data.entityList[i].TermDescription,
                    "in":data.entityList[i].InstructorName
                }
            }
        });
    };


});


