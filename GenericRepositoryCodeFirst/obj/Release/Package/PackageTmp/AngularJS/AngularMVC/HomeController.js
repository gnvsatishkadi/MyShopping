/// <reference path="../Scripts/angular.js" />
/// <reference path="UploadModule.js" />

app.controller('SelectingIconsController', function ($scope) {
    
    $scope.RetrievePartialPages = function (value) {
        alert(value);
        return false;
    }
});


//Testing 
app.controller('labelController', function ($scope) {
    $scope.Testing = function () {
        
        alert('i click label 1 ');
        return false;
    };
});
