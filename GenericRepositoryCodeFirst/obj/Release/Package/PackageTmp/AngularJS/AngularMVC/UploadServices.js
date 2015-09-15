/// <reference path="../Scripts/angular.js" />
/// <reference path="SmiteModule.js" />

app.service('uploadService', function ($http) {

    this.userData = { yearSetCount: 0 };
    this.name = null;

    //GetAllProductTypes landing Result  ****
    this.getAllProductTypes = function () {
        var products = $http({
            method: 'Get',
            url: '/Shop/GetAllProductTypes'
        });
        return products;
    };

    //GenderBySelProdType  **** User Select Product Type;
    this.getGenderBySelProdType = function (id) {

        var gender = $http({
            method: 'Get',
            url: '/Shop/GetGenderBySelProdType',
            params: { ProdId: id }
        });
        return gender;
    };

    //getGenderBySelProdTypeFootWare **** User select Product Type
    this.getGenderBySelProdTypeFootWare = function (id) {
        var gender = $http({
            method: 'Get',
            url: '/AllProducts/GetGenderBySelProdTypeFootWare',
            params: { ProdId: id }
        });
        return gender;
    };

    //CategoryBySelGender  **** User Select Gender  
    this.getCategoryBySelGender = function (gender) {
        var Categorys = $http({
            method: 'Get',
            url: '/Shop/GetCategoryBySelGender',
            params: { Gender: gender }
        });
        return Categorys;
    };



    //GetBrandNames    **** User Select Category Type
    this.getBrands = function (CategoryId) {
        var Brands = $http({
            method: 'Get',
            url: '/Shop/GetBrand',
            params: { CategoryId: CategoryId }
        });
        return Brands;
    };

    //GetNeckType    **** User Select Category Type
    this.getNeckTypes = function (CategoryId) {

        var NeckType = $http({
            method: 'Get',
            url: '/Shop/GetNeckType',
            params: { CategoryId: CategoryId }
        });
        return NeckType;
    };

    //Get ClothFit  ***** User Select Category Type 
    this.getClothFit = function (CategoryId) {

        var NeckType = $http({
            method: 'Get',
            url: '/Shop/GetFit',
            params: { CategoryId: CategoryId }
        });
        return NeckType;
    };

    //GetClothSleeves ***** User Select Category Type 
    this.getClothSleeves = function (CategoryId) {
        var NeckType = $http({
            method: 'Get',
            url: '/Shop/GetSleeves',
            params: { CategoryId: CategoryId }
        });
        return NeckType;
    };

    //GetClothColor
    this.getClothColors = function (CategoryId) {
        var Clothcolor = $http({
            method: 'Get',
            url: '/Shop/GetColor',
            params: { CategoryId: CategoryId }
        });
        return Clothcolor;
    };

    //GetClothMaterials
    this.getClothMaterials = function (CategoryId) {
        var ClothMaterial = $http({
            method: 'Get',
            url: '/Shop/GetMaterials',
            params: { CategoryId: CategoryId }
        });
        return ClothMaterial;
    };

    //GetClothOccasion
    this.getClothOccasion = function (CategoryId) {
        var ClothOccasion = $http({
            method: 'Get',
            url: '/Shop/GetOccasion',
            params: { CategoryId: CategoryId }
        });
        return ClothOccasion;
    };

    this.getClothSize = function (CategoryId) {
        var Size = $http({
            method: 'Get',
            url: '/Shop/GetSize',
            params: { CategoryId: CategoryId }
        });
        return Size;
    };

    //Rtrieving Dynamic Partial View Pages
    this.getDynamicPartialPages = function (PageType) {

        var Dynamic = $http({
            method: 'GET',
            url: '/Paytm/DynamicPartials',
            params: { Category: PageType },
            success: function () {
                alert('yes i got the page');
                return false;
            },
            error: function () {
                alert('Failure to page load');
                return false;
            }
        });
        return Dynamic;
    };

    this.GetDataBySelectingIcons = function () {

        var DynClothData = $http({
            method: 'GET',
            url: '/AllProducts/GetDataBySelectingIcons'
        });
        return DynClothData;
    };

    this.PageReditect = function (choice) {

        this.userData.choice = choice;
        this.name = "satish";
    };

    this.ResultReditect = function () {

        alert(this.name);
        return this.userData.choice;
    };

    //Stage 1
    //DashBoard Data Display i'e user selected relative information will be display 
    //GetSizeContent
    this.getClothSizeContent = function (CatgId) {

        var Size = $http({
            method: 'GET',
            url: 'Shop/GetSize',
            params: { CategoryId: CatgId }
        });
        return Size;
    };

    //GetBrandContent
    this.getClothBrandContent = function (CatgId) {

        var Brand = $http({
            method: 'GET',
            url: 'Shop/GetBrand',
            params: { CategoryId: CatgId }
        });
        return Brand;
    };

    //GetNecktypeContent
    this.getClothNecktypeContent = function (CatgId) {

        var Necktype = $http({
            method: 'GET',
            url: 'Shop/GetNecktype',
            params: { CategoryId: CatgId }
        });
        return Necktype;
    };

    //GetSleevesContent
    this.getClothSleevesContent = function (CatgId) {

        var Sleeves = $http({
            method: 'GET',
            url: 'Shop/GetSleeves',
            params: { CategoryId: CatgId }
        });
        return Sleeves;
    };

    //GetFitContent
    this.getClothFitContent = function (CatgId) {

        var Fit = $http({
            method: 'GET',
            url: 'Shop/GetFit',
            params: { CategoryId: CatgId }
        });
        return Fit;
    };

    //GetDashboardcloth
    this.getDashboardcloth = function (CatgId) {

        var DashboardCloth = $http({
            method: 'GET',
            url: 'Shop/GetDashboardCloth',
            params: { CategoryId: CatgId }
        });
        return DashboardCloth;
    };

    //GetUploadingProducts
    this.uploadingProducts = function (FormData) {

        var result = $http({
            method: "POST",
            url: '/AllProducts/UploadingFiles',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        });
        return result;

    };
    //alert('service sending files and content to MVC controller');
    //var result = $http({
    //    method: 'POST',
    //    url: '/AllProducts/UploadingFiles',
    //    //transformRequest: transformRequestAsFormPost,
    //    params: {
    //        Files: Files,
    //        upload: upload
    //    }
    //});
    //result.success(function (html) {
    //    alert('result is returned');
    //});
    //return result;

    //getSelectedDBProduct
    this.getSelectedDBProduct = function (ItemId) {

        var SelectedDBProduct = $http({
            method: 'GET',
            url: 'Shop/GetSelectedDBProduct',
            params: { ItemId: ItemId }
        });
        return SelectedDBProduct;
    };

    this.getSizeDropdown = function (DashBoard) {
        var DashBoardSize = $http({
            method: 'GET',
            url: 'Shop/GetSelectedDashBoardSize',
            data: { DashBoard: DashBoard }
        });
        return DashBoardSize;
    };

    //CheckPinAvailOrNot
    this.CheckPinAvailOrNot = function (pin) {
        var PinAvailOrNOt = $http({
            method: 'GET',
            url: 'Shop/PinAvailOrNOtChecking',
            params: { pin: pin }
        });
        return PinAvailOrNOt;
    };
});


