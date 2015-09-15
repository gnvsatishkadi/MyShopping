/// <reference path="../../Views/Shared/_ClothsPartial.cshtml" />
/// <reference path="../../ModalHtml/FileUpload.html" />
/// <reference path="../../Views/Home/Partial1.cshtml" />
/// <reference path="../Scripts/angular.js" />
/// <reference path="UploadModule.js" />

//var app = angular.module('PaytmApp', ['ui.bootstrap', 'ngRoute']);

app.controller('ClothProductCtrl', function ($scope, $routeParams) {
      
    alert('in ctrl:' + $routeParams.ItemId);
});