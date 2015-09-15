var app = angular.module('CrudModule', []);
app.controller('crudController', function ($scope, $http) {

    getAllCounry();
    function getAllCounry() {

        $http({
            method: 'Get',
            url: '/Paytm/GetCountrys'
        }).success(function (data) {
            $scope.countryList = data;
        }).error(function () {
            $scope.errorMessage = 'Not found';
        });
    }

    $scope.GetStatesList = function () {

        var getCountry = $scope.Country;
        if (getCountry) {           // Check here country Id is null or not

            $http({
                method: 'POST',
                url: '/Paytm/GetStatesByCountryId/',
                data: JSON.stringify({ CountrysId: getCountry.CountrysId })
            }).success(function (data) {
                $scope.stateList = data;
            }).error(function (data) {
                alert(data.message);
                $scope.message = 'not found';
            });
        }
        else {
            $scope.stateList = null;
        }
    }
});