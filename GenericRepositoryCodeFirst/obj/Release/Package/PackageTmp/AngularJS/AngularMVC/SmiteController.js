/// <reference path="../Scripts/angular.js" />
/// <reference path="../Module.js" />

app.controller('crudController', ['$scope', 'crudService', function ($scope, crudService) {


    $scope.Login = {
        Username: '',
        Password: ''
    };

    //Date Finding

    var p = new Date();
    $scope.date = p.toLocaleDateString();

    $scope.Email = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    getAllCountry();

    //GetAllCountrys at pageload time
    function getAllCountry() {
        var countrys = crudService.getCountrys();
        countrys.then(function (p1) {
            $scope.countryList = p1.data;
        });
    }

    //GetStates By passing Id
    $scope.GetStatesList = function () {
        var countryid = $scope.S.Country;
        var states = crudService.getStates(countryid.CountrysId);
        states.then(function (p1) {
            $scope.stateList = p1.data;
        });
    }
    //Loign Registration Controls
    $scope.SubmitLoginData = function (Login) {
        if (Login) {
            alert(Login.Username);
            var Result = crudService.Loginuser(Login);
        }
    }

    //Validate Signup Form
    $scope.SubmitSignupData = function (Isvalid, S) {
        if (!Isvalid) {
            alert("Please fil the form Correctly");
            return false;
        }
        else {
            //var email = $scope.S.Email;
            var country = $scope.S.Country;
            var paytmCustomer = {
                FirstName: $scope.S.FName,
                LastName: $scope.S.LName,
                UserName: $scope.S.UName,
                Password: $scope.S.PWord,
                Gender: $scope.S.Gender,
                Email: $scope.S.Email,
                Mobile: $scope.S.Mobile,
                Country: $scope.S.Country.CountryName,
                State: $scope.S.State.StateName,
                DOB: $scope.S.DOB,
                DateofAccount: $scope.date,
                Question: $scope.S.Question,
                Answer: $scope.S.Answer
            };

            var InsertNew = crudService.inserting(paytmCustomer);
            InsertNew.then(function (p1) {

                alert('Record is inserted successfully');
            }, function (err) {

                alert('Failure to Insert New Record');
            });
        }
    }

    //Validate Mobile number 
    $scope.ValidateMobile = function (e, Number) {

        var charCode = (e.which) ? e.which : e.keyCode;
        return IsNumber(e, charCode);
    }

    function IsNumber(e, charCode) {
        if (
            (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57))
            return false;
        else
            return true;
    }

}]);