
//JQuery Script
//$(document).ready(function () {

//    $("#NewAccountDiv").hide();
//    $("#LoginDiv").show();

//    $("#Signup").click(function () {
//        $("#NewAccountDiv").show(500);
//        $("#LoginDiv").hide(500);

//    });

//    $("#Login").click(function () {
//        $("#NewAccountDiv").hide(500);
//        $("#LoginDiv").show(500);

//    });

//});


//AngularJS Script 
var app = angular.module('PaytmApp', []);
app.controller('LandingLoginCtrl', function ($scope, $http, $rootScope) {


    //Show Hide Contents
    $scope.LoginErrImg = false;

    //Delcare ViewModel Class
    $scope.LoginModel = {};

    $scope.NewUserReg = {};

    //Retrieve Login Data
    $scope.ReturningCustomer = function (Landing) {
        debugger;
        //Assign values to LoginModel 
        $scope.LoginModel.EmailId = $scope.Landing.EmailId;
        $scope.LoginModel.Password = $scope.Landing.Password;
        $scope.LoginModel.FormType = 'ExistingCustomer';
        PostProduct($scope.LoginModel);
    };


    //SignUpData
    $scope.NewCustomerSignUp = function (SignUp) {
        //Assign values to LoginModel 
        debugger;
        $scope.NewUserReg.UserName = $scope.SignUp.Username;
        $scope.NewUserReg.Mobile = $scope.SignUp.Mobile;
        $scope.NewUserReg.EmailId = $scope.SignUp.EmailId;
        $scope.NewUserReg.Password = $scope.SignUp.Password;
        $scope.NewUserReg.FormType = 'NewCustomer';
        PostProduct($scope.NewUserReg);
    };

    var PostProduct = function (Form) {
        debugger;
        var URL = '';
        if (Form.FormType == 'ExistingCustomer') {
            URL = '/AllProducts/LoginUser';
        }
        else {
            URL = '/AllProducts/NewSignUpData';
        }
        var FormData = transformCombineModel(Form);
        debugger;
        $http({
            method: "POST",
            url: URL,
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {
            debugger;
            if (data.length > 0 || data == 1) {
                alert('login success');
                debugger;
                //Store Login Information into Session
                //$http.post('TrackOrder/LoginSession', {})
                $http({
                    method: "POST",
                    url: 'http://localhost:62969/TrackOrder/OrderSession',
                    headers: { "Content-Type": undefined },
                    transformRequest: window.angular.identity,
                    data: FormData
                })
                .success(function (data) {
                    if (data == 1) {
                        $scope.LoginErrImg = false;
                        location.href = "http://localhost:62969/#/";
                        $rootScope.$broadcast("Update", $scope.LoginModel.EamilId);
                    }
                    else {
                        alert('Sorry, Not move To home Page');
                        location.href = "http://localhost:62969/Home/LandLogin/";
                    }

                });
            }
            else {
                $scope.LoginErrImg = true;
                $scope.SignUpErrMsg = 'Unable to create your Account Right Now. Try Again Later';
            }
        });
    }

    var transformCombineModel = function (data) {

        var dataAsFormData = new FormData();
        window.angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    }
});