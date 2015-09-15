/// <reference path="../Scripts/angular.js" />
/// <reference path="SmiteModule.js" />

app.service('crudService', function ($http) {
    //Login Service 
    this.Loginuser = function (Login) {
        var request = $http({
            method: "put",
            url: "/Registration/Login",
            data: Login
        });
        return request;
    }

    //Get All Countrys
    this.getCountrys = function () {
        var country = $http({
            method: 'Get',
            url: '/AllProducts/GetCountrys'
        });
        return country;
    }

    //Get All States
    this.getStates = function (countryid) {
        var states = $http({
            method: 'POST',
            url: '/AllProducts/GetStatesByCountryId',
            data: JSON.stringify({ countryId: countryid })
        });
        return states;
    }

    //Insert New Record
    this.inserting = function (paytmCustomer) {
        alert('service');
        
        var paytmnew = $http({
            method: 'POST',
            url: 'Insert',
            data: paytmCustomer
        });
        return paytmnew;
    }
});
