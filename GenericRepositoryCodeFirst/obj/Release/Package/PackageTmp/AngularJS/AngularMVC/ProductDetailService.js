/// <reference path="../Scripts/angular.js" />
/// <reference path="UploadModule.js" />


app.service('ProductDetailService', function ($http) {
      
    alert('prod service');
    //Get BrandCloth Details by passing CategoryId as parameter
    this.getBrandCloth = function (CategoryId) {
        alert('prod serv ' + CategoryId);
    }
});