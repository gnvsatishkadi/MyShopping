/// <reference path="../../ModalHtml/ClothProducts.html" />
/// <reference path="../../Views/Shop/test.html" />
/// <reference path="../Scripts/angular.js" />
var app;
(function () {
    app = angular.module('PaytmApp', ['ui.bootstrap', 'ngRoute']);

})();



//Routing
app.config(['$routeProvider',
  function ($routeProvider) {

      $routeProvider.
          when('/Home/Login', {
              templateUrl: 'ModalHtml/LandingLogin.html',
              controller: 'LandingLoginCtrl'
          }).
          when('/Home/LogOut', {
              templateUrl: 'ModalHtml/HomeLanding.html',
              controller: 'HomePageCtrl'
          }).
          when('/', {
              templateUrl: 'ModalHtml/HomeLanding.html',
              controller: 'HomePageCtrl'
          }).
        when('/Shop/MenCloth/:ItemId', {
            templateUrl: 'ModalHtml/ClothProducts.html',
            controller: 'ClothProductCtrl'
        }).
          when('/Shop/WomanCloth/:ItemId', {
              templateUrl: 'ModalHtml/ClothProducts.html',
              controller: 'ClothProductCtrl'
          }).
          when('/PaytmWallet', {
              templateUrl: 'ModalHtml/Profile.html',
              controller: 'ProfileCtrl'
          }).
          when('/Shop/ProductSelected/:ItemId', {
              templateUrl: 'ModalHtml/ProductSelected.html',
              controller: 'ProductSelectedCtrl'
          }).
          when('/Shop/M/Mobile', {
              templateUrl: 'ModalHtml/MobileHome.html',
              controller: 'ProductHomeCtrl'
          }).
          when('/Shop/M/Cloth', {
              templateUrl: 'ModalHtml/ClothMenHome.html',
              controller: 'ProductHomeCtrl'
          }).
          when('/Shop/W/Cloth', {
              templateUrl: 'ModalHtml/ClothWomenHome.html',
              controller: 'ProductHomeCtrl'
          }).
          when('/Shop/M/Electronics', {
              templateUrl: 'ModalHtml/ElectronicsHome.html',
              controller: 'ProductHomeCtrl'
          }).
          when('/Shop/M/FootWares', {
              templateUrl: 'ModalHtml/FootWaresHome.html',
              controller: 'ProductHomeCtrl'
          }).
          when('/Shop/M/Books', {
              templateUrl: 'ModalHtml/BooksHome.html',
              controller: 'ProductHomeCtrl'
          }).
          when('/Shop/M/Kitchen', {
              templateUrl: 'ModalHtml/KitchenHome.html',
              controller: 'ProductHomeCtrl'
          }).
          when('/Shop/Cart/', {
              templateUrl: 'ModalHtml/ProductCartItems.html',
              controller: 'ProductCartCtrl',
          }).
           when('/Shop/DelivaryAddress/', {
               templateUrl: 'ModalHtml/ProductDelivaryAddress.html',
               controller: 'ProductDelivaryAddressCtrl',
           }).
          when('/Shop/OrderSummary/', {
              templateUrl: 'ModalHtml/OrderSummary.html',
              controller: 'OrderSummaryCtrl',
          }).
          when('/Shop/TrackOrderLive/', {
              templateUrl: 'ModalHtml/TrackOrderLive.html',
              controller: 'TrackOrderLiveCtrl',
          }).
          when('/Shop/TrackOrderHistory/:POId/:POItemId', {
              templateUrl: 'ModalHtml/TrackOrderHistory.html',
              controller: 'TrackOrderHistoryCtrl',
          }).
          when('/Shop/MyOrders/', {
              templateUrl: 'ModalHtml/MyOrders.html',
              controller: 'MyOrdersCtrl',
          }).
          when('/User/UpdateProfile/', {
              templateUrl: 'ModalHtml/UpdateProfile.html',
              controller: 'UpdateProfileCtrl',
          }).
      otherwise({
          redirectTo: '/'
      });
  }]);

app.controller('LoginCtrl1', function ($scope) {
    alert('login ctrl one');
});




