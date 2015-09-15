/// <reference path="../../Views/Shared/_ClothsPartial.cshtml" />
/// <reference path="../../ModalHtml/FileUpload.html" />
/// <reference path="../../Views/Home/Partial1.cshtml" />
/// <reference path="../Scripts/angular.js" />
/// <reference path="UploadModule.js" />
/// <reference path="LandLoginScript.js" />

app.controller('HomePageCtrl', function ($scope, $rootScope, $http) {
    //Show Hide Div

    $scope.$parent.MenuOne = true;
    $scope.$parent.MenuTwo = false;

    //Dynamic MenuGap
    $scope.$parent.DynamicMenuGap = 'MenuOneGap';
    CheckLoginSession();
    function CheckLoginSession() {
        $http.post('TrackOrder/RetrieveLoginSessionData', {})
            .success(function (data, config) {
                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';

                    //$scope.MyOrdersDiv = false;
                    //location.href = "http://localhost:62969/#/Home/Login";
                }
                else {

                    $scope.$parent.LoginEmailId = data.EmailId;
                    $scope.$parent.LoginUsername = data.UserName;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Logout';

                    //location.href = "http://Localhost:62969/#/Shop/MyOrders/";
                    //LoadingMyOrdersData();
                }
            });
    };


    $scope.$parent.LoginUsername = 'Guest';
    $rootScope.$on("Update", function (event, message) {

        $scope.LoginCustomer = message;
    });
    $scope.$parent.ProductCartPage = false;

});

app.controller('UploadController', ['$scope', 'uploadService', '$modal', function ($scope, uploadService, $modal, $log) {

    //Get All ProductTypes
    GetAllProductTypes();

    function GetAllProductTypes() {

        var products = uploadService.getAllProductTypes();

        products.then(function (p1) {
            $scope.ProductList = p1.data;
            $scope.Welcome = 'Welcome to Upload Form';
        }, function (err) {
            alert('Failure to Retrieve Datasss');
        });
        return products;

    }

    //model popup start 
    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: '/ModalHtml/FileUpload.html',
            controller: 'ModalInstanceCtrl'
        });
    };

    //model end

    $scope.fileNameChanged = function (files) {
        var FileCount = files.length;
        var Binded = angular.element(document.querySelector('#UploadImg'));
        //img tags length
        var currentimglen = $("#image_preview").find('img').length;


        if (FileCount > 4) {
            alert('Please Select Max 4 Files only...');
            return false;
        }
        else {
            if ((currentimglen + FileCount) <= 4) {
                for (var i = 0; i < FileCount; i++) {
                    file = files[i];
                    var imagefile = file.type;
                    var imagename = file.name;
                    var match = ["image/jpeg", "image/png", "image/jpg"];
                    if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
                        $('#previewing').attr('src', '');
                        $("#message").html("<p id='error'>Please Select A valid Image File</p>" + "<h4>Note</h4>" + "<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
                        return false;
                    }
                    else {
                        var reader = new FileReader();
                        reader.onload = imageIsLoaded;
                        //reader.onload = Imagesdata(imagename, imagefile);
                        reader.readAsDataURL(files[i]);
                        //var data = getbinary(file);
                        //alert(data);
                    }
                }
            }
            else {
                alert('Sorry, You are allow to Upload 4 files only.*** You already...' + currentimglen + '.File(s) Selected');
                return false;
            }
        }
        function imageIsLoaded(e) {
            var newdiv = '<div>' +
            '<img id="img_" class="imgclass" src ="' + e.target.result + '" width="100px" height="100px">' +
           '</div><div><label  id="' + imagename + '"  >' + imagename + '</label></div><div><a href="#" class="remove_block"><span class="glyphicon glyphicon-trash"></span>Remove</a></div>' +
           'Satish</div>';
            $(newdiv).appendTo('#image_preview');

            // count = count - 1;
            //$("#file").css("color", "green");
            //$('#image_preview').css("display", "block");

            /* var newdiv = '<div class="col-md-4"><div id="up_' + count + '">' +
                 '<div>' +
                  '<img id="img_' + count + '" src ="' + e.target.result + '" width="100px" height="100px">' +
                 '</div><div><label  id="' + imagename + '"  >' + imagename + '</label></div><div><a class="remove_block" href="#"><span class="glyphicon glyphicon-trash"></span>Remove</a></div>' +
                 '</div></div>';
             $(newdiv).appendTo('#image_preview'); */

            //var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
            //img.attr('src', e.target.result);
            //img.attr('width', '120px');
            //img.attr('height', '100px');
            //img.appendTo('#image_preview');

            //   $('#previewing' + (count)).attr('src', e.target.result);
            //  $('#previewing' + (count)).attr('width', '120px');
            //  $('#previewing' + (count)).attr('height', '100px');
        };
    };

    function Imagesdata(name, file) {


        var newdiv = '<div>' +
        '<img id="img_" src ="' + name + '" width="100px" height="100px">' +
        '</div>';
        $(newdiv).appendTo('#image_preview');
    }

    function getbinary(file) {
        return file.target.result;
    };

    $scope.SubmitFilesData = function (FileUploadForm) {
        var uploadfiles = uploadService.FileUploadingData
    }

    //Getting Templates Depending on Product Cype
    $scope.GetSelectedProductType = function (value, id) {
        $scope.GenderList = '';
        $scope.CategoryList = '';
        $scope.BrandList = '';
        switch (value) {
            case ('Cloths'):
            case ('FootWares'):
                {
                    var Gender = '';
                    if (value == 'Cloths') {
                        Gender = uploadService.getGenderBySelProdType(id);
                    }
                    if (value == 'FootWares') {
                        Gender = uploadService.getGenderBySelProdTypeFootWare(id);
                    }
                    Gender.then(function (p1) {
                        $scope.GenderList = p1.data;
                    }, function (err) {
                        alert('Failure to retrieve gender data');
                    });

                    /*var myEl = angular.element(document.querySelector('#Rone'));
    
                    //Gender Binding
                    var Gender = "";
                    Gender += '<div><label>Select Gender</label>';
                    Gender += '<select ng-model="Upload.Gender">';
                    Gender += '<option value="">Select Gender</option>';
                    Gender += '<option value="Male">Male</option>';
                    Gender += '<option value="FeMale">FeMale</option>';
                    Gender += '</select></div>';
                    myEl.html('<div><select ng-model="Upload.Gender" ng-change="SelectGender(Upload.Gender)"><option value="">select gender</option><option value="male">male</option><option value="female">female</option></select></div>');*/
                    break;
                }
            case ('Mobiles'):
                {
                    break;
                }
            case ('Electronics'):
                {

                    break;
                }
            case ('Home&Kitchen'):
                {

                    break;
                }
            case ('Books'):
                {
                    break;
                }
            default:
                {

                    break;
                }
        }
    }

    //Getting Category Data Depending on Gender From Template Selection
    $scope.GetCategoryBySelGender = function (gender) {
        var categorys = uploadService.getCategoryBySelGender(gender);
        categorys.then(function (p1) {
            $scope.CategoryList = p1.data;
        }, function (err) {
            alert('Failure to retrieve Categorys Data');
        });
    }
    //SelectGender
    $scope.SelectGender = function (value) {
        alert(value);
    }
    //Select (Brandname and Necktype  and Fit Also) by passing CategoryId from Select Category Control
    $scope.GetBrand = function (CategoryId, CategoryName) {
        //Array Conditions
        var HideNecktype = [4, 5, 7, 8, 9, 11];
        var HideSleeves = [4, 5, 7, 8, 9, 11];
        var HideMaterials = [1, 2, 3, 4, 5, 6, 9, 10, 11];
        var HideSize = [7, 8];
        var HideOccasion = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11];
        var HideFit = [7, 8];

        //Variable Decloration
        //var Necktype = null;
        //var ClothSleeves = null;
        //var ClothMaterial = null;
        //var ClothSize = null;
        //var ClothOccasion = null;
        //var ClothFit = null;

        //Necktype
        if (HideNecktype.indexOf(CategoryId) != -1) {
            $scope.NecktypeDisabled = true;
        }
        else {
            $scope.NecktypeDisabled = false;
            //var Necktype = uploadService.getNeckTypes(CategoryId);
        }
        //Sleeves
        if (HideSleeves.indexOf(CategoryId) != -1) {
            $scope.SleevesDisabled = true;
        }
        else {
            $scope.SleevesDisabled = false;
            //var ClothSleeves = uploadService.getClothSleeves(CategoryId);
        }
        //Materials
        if (HideMaterials.indexOf(CategoryId) != -1) {
            $scope.MaterialDisabled = true;
        }
        else {

            $scope.MaterialDisabled = false;
            //var ClothMaterial = uploadService.getClothMaterials(CategoryId);
        }

        //Size
        if (HideSize.indexOf(CategoryId) != -1) {
            $scope.SizeDisabled = true;
        }
        else {
            $scope.SizeDisabled = false;
            //var ClothSize = uploadService.getClothSize(CategoryId);
        }

        //Occasion
        if (HideOccasion.indexOf(CategoryId) != -1) {
            $scope.OccasionDisabled = true;
        }
        else {
            $scope.OccasionDisabled = false;
            //var ClothOccasion = uploadService.getClothOccasion(CategoryId);
        }

        //Fit
        if (HideFit.indexOf(CategoryId) != -1) {
            $scope.FitDisabled = true;
        }
        else {
            $scope.FitDisabled = false;
            //var ClothFit = uploadService.getClothFit(CategoryId);
        }


        var Brands = uploadService.getBrands(CategoryId);
        var Clothcolor = uploadService.getClothColors(CategoryId);
        var ClothFit = ClothFit = uploadService.getClothFit(CategoryId);
        var ClothOccasion = uploadService.getClothOccasion(CategoryId);
        var ClothSize = uploadService.getClothSize(CategoryId);
        var ClothMaterial = uploadService.getClothMaterials(CategoryId);
        var ClothSleeves = uploadService.getClothSleeves(CategoryId);
        var Necktype = uploadService.getNeckTypes(CategoryId);

        //Brands
        Brands.then(function (p1) {
            $scope.BrandList = p1.data;
        }, function (err) {
            alert('Failure to retrieve Brands Data');
        });

        //NeckTypes
        Necktype.then(function (p1) {

            $scope.NeckTypeList = p1.data;
        }, function (err) {
            alert('Failure to retrieve Necktype Data');
        });

        //ClothFit
        ClothFit.then(function (p1) {
            $scope.ClothFitList = p1.data;
        }, function (err) {
            alert('Failure to retrieve ClothFit Data');
        });

        //ClothSleeves
        ClothSleeves.then(function (p1) {
            $scope.ClothSlevesList = p1.data;
        }, function (err) {
            alert('Failure to retrieve Sleves Data');
        });

        //ClothColor
        Clothcolor.then(function (p1) {
            $scope.ColorList = p1.data;
        }, function (err) {
            alert('Failure to retrieve Clothcolor Data');
        });

        //ClothMaterials
        ClothMaterial.then(function (p1) {

            $scope.ClothMaterialList = p1.data;
        }, function (err) {
            alert('Failure to retrieve ClothMaterial Data');
        });

        //ClothOccasion
        ClothOccasion.then(function (p1) {
            $scope.ClothOccasionList = p1.data;
        }, function (err) {
            alert('Failure to retrieve ClothOccasion Data');
        });

        //ClothSize
        ClothSize.then(function (p1) {
            $scope.ClothSizeList = p1.data;
        }, function (err) {
            alert('Failure to retrieve ClothSize Data');
        });
    }
    $scope.Close = function () {

    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.UploadProduct = function (Upload) {
        var modalInstance = $modal.open({
            templateUrl: '/ModalHtml/FileUpload.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                upload: function () {
                    return Upload;
                }
            }
        });

        $scope.$broadcast('sendto_ModalInstance_controller', Upload);
        alert(Upload.ProductType.ProdType);
    }
}]);

app.controller('ModalInstanceCtrl', function ($scope, uploadService, $modalInstance, upload, $http) {

    $scope.Upload = upload;

    $scope.ClothCategory = upload.ProductType.ProdType;

    $scope.RemoveImg = function () {
        alert('remove');
    }

    //$scope.$on("sendto_ModalInstance_controller", function (event, Upload) {
    //    alert('sendto');
    //    alert(Upload.ProductType.ProdType);
    //    $scope.ClothCategory = Upload.ProductType.ProdType;
    //});

    $scope.ok = function (User) {

        $modalInstance.dismiss('cancel');
        return false;
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        return false;
    };
    $scope.Changed = function (name) {

        $modalInstance.dismiss('cancel');
        return false;

    };
    $scope.fileNameChanged = function (files) {

        $scope.FileContent = files;

        var FileCount = files.length;
        var Binded = angular.element(document.querySelector('#UploadImg'));
        var currentimglen = $("#image_preview1").find('img').length;
        if (FileCount == 0) {
            alert('Please Select atleast File for Uploading...');
            return false;
        }
        else {
            if ((currentimglen + FileCount) <= 1) {
                //for (var i = 0; i < FileCount; i++) {
                file = files[0];
                var imagefile = file.type;
                var imagename = file.name;
                var match = ["image/jpeg", "image/png", "image/jpg"];
                if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
                    $('#previewing').attr('src', '');
                    $("#message").html("<p id='error'>Please Select A valid Image File</p>" + "<h4>Note</h4>" + "<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
                    return false;
                }
                else {
                    var reader = new FileReader();
                    reader.onload = imageIsLoaded;
                    reader.readAsDataURL(files[0]);
                }
                //}
            }
            else {
                alert('Sorry, You are allow to Upload 1 files only.*** You already...' + currentimglen + '.File(s) Selected');
                return false;
            }
        }
        function imageIsLoaded(e) {
            var newdiv = '<div>' +
                         '<img id="img_" class="imgclass" src ="' + e.target.result + '" width="100px" height="100px" />' +
                         '<label  id="' + imagename + '"  >' + imagename + '</label>' +
                         '</div>' +
                         '<div>' +
                         '<a href="#"  ng-click="RemoveImg()"class="remove_block"><span class="glyphicon glyphicon-trash"></span>Remove</a>' +
                         '</div>';
            $(newdiv).appendTo('#image_preview1');
        };
    };

    //Load data into Database
    $scope.InsertProduct = {};
    $scope.FileUploadingData = function (F) {

        var BeforeDis = $scope.F.ProductCost;
        var FileContent = $scope.FileContent;
        var IsDiscount = $scope.F.ISDiscount;
        var DisPercentage = $scope.F.DiscountPercent;
        var AfterDisAmount = 0;

        if (IsDiscount == 'Y') {
            var Discount = DisPercentage / 100;
            AfterDisAmount = BeforeDis - (BeforeDis * Discount);
        }
        else {
            DisPercentage = 0;
            AfterDisAmount = BeforeDis;
        }


        var M = 0;
        // for (var filecount = 0 ; filecount < FileContent.length; filecount++) {
        //Assign values to InsertProduct Class
        $scope.InsertProduct.Files = FileContent;
        $scope.InsertProduct.ItemId = upload.ProductType.ProdId;
        $scope.InsertProduct.CategoryId = upload.Category.CategoryId;
        $scope.InsertProduct.Size = upload.Size.Size;
        $scope.InsertProduct.Brand = upload.Brand.BrandName;
        $scope.InsertProduct.Color = upload.ColorName.ColorName;
        $scope.InsertProduct.Sleeves = upload.ClothSleeves.SlevesType;
        $scope.InsertProduct.Fit = upload.ClothFit.FitType;
        $scope.InsertProduct.Material = upload.ClothMaterial.MaterialType;
        $scope.InsertProduct.Status = $scope.F.Status;
        $scope.InsertProduct.Occasion = M;
        $scope.InsertProduct.FilePath = M;
        $scope.InsertProduct.FileName = M;
        $scope.InsertProduct.NeckType = upload.NeckType.NeckType;
        $scope.InsertProduct.ProdId = upload.ProductType.ProdId;
        $scope.InsertProduct.ProductCost = $scope.F.ProductCost;
        $scope.InsertProduct.IsDiscountAvail = $scope.F.ISDiscount;
        $scope.InsertProduct.DiscountPercent = DisPercentage;
        $scope.InsertProduct.AfterDiscountCost = AfterDisAmount;
        $scope.InsertProduct.ProductCount = $scope.F.ProductCount;
        $scope.InsertProduct.ProductDescription = $scope.F.ProductDescription;

        PostProduct();
        //  }

        //var files = files;
        //var uploadres = uploadService.uploadingProducts(files, upload);
        //uploadres.then(function (p1) {
        //    alert('Data submitted to controller');
        //}, function (err) {
        //    alert('Failure to submit Data');
        //});
        $modalInstance.dismiss('cancel');
    };

    //PostProduct() Method
    var PostProduct = function () {

        //for (var i = 0 ; i < $scope.FileContent.length; i++) {
        $scope.InsertProduct.Files = $scope.FileContent[0];
        var FormData = transformCombineModel($scope.InsertProduct);

        $http({
            method: "POST",
            url: '/AllProducts/UploadingFiles',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        });

        //var uploadres = uploadService.uploadingProducts(FormData);
        //uploadres.then(function (p1) {
        //    alert('Data submitted to controller');
        //}, function (err) {
        //    alert('Failure to submit Data');
        //});
        // }
    }

    var transformCombineModel = function (data) {


        var dataAsFormData = new FormData();
        window.angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    }

    //Radio button values
    $scope.F = {
        Status: 'Y',
        ISDiscount: 'Y'
    }

    //ItemsCountChanged
    $scope.ItemsCountChanged = function (count) {
        if (count == undefined) {
            $scope.F.ItemsCount = 1;
        }
    }

    //PresentRateChanged
    $scope.ProductCostChanged = function (rate) {

        if (rate == undefined) {
            $scope.F.ProductCost = 1;
        }
    }
    //DiscountPercentChanged
    $scope.DiscountPercentChanged = function (Discount) {

        if (Discount == undefined) {
            $scope.F.DiscountPercent = 0;
        }
    }
});

//Home page controllers
app.controller('SelectingIconsController', ['$scope', 'uploadService', '$modal', '$log', '$compile', '$location', '$window', '$http', function ($scope, uploadService, $modal, $log, $compile, $location, $window, $http) {

    $scope.value = null;
    //Hide menu from child controller
    $scope.ProductCartPage = false;
    $scope.HideCategoryListDisplayDiv = false;


    //Finding Scrolling position
    $scope.scrollPos = 0;
    $window.onscroll = function () {
        $scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
        if ($scope.scrollPos > 280) {

        }
        else {

        }
    }

    var DynClothData = uploadService.GetDataBySelectingIcons();
    DynClothData.then(function (p1) {
        $scope.DynClothData = p1.data;
        $scope.msg = "dynamically";
    }, function (err) {
        alert('Failure to retrieve Categorys Data');
    });

    //HidemenuContent
    $scope.delete = function () {
        $scope.hide = true;
        $scope.HideCategoryListDisplayDiv = false;
    };

    $scope.GetDataBySelectingIcons = function (value) {
        $scope.hide = false;
        $scope.HideCategoryListDisplayDiv = true;
        //var htmlcontent = $('#loadhtml');
        //htmlcontent.load('/Paytm/DynamicPartials?Category=' + value)
        //$compile(htmlcontent.contents())($scope);

        $scope.SelectedIcon = value;


        if (value == 'Cloths') {
            //var DynClothData = uploadService.GetDataBySelectingIcons();
            //DynClothData.then(function (p1) {
            //    $scope.DynClothData = p1.data;
            //    $scope.msg = "dynamically";
            //}, function (err) {
            //    alert('Failure to retrieve Categorys Data');
            //});
        }
    };

    $scope.ChooseOptions = function (choice, category) {

        $scope.testing = category;
        $scope.$broadcast('update_parent_controller', $scope.testing);

        //var Redirect = uploadService.PageReditect(choice);
        //$location.path('/Shop/MenCloth');
    };

    //Logout User
    $scope.LogoutUser = function () {
        $http.post('TrackOrder/LogoutUserSession', {})
            .success(function (data) {
                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';

                    //$scope.MyOrdersDiv = false;
                    location.href = "http://localhost:62969/#/Home/Login";
                }
                else {
                    $scope.$parent.LoginUsername = data.EmailId;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/LogOut';

                    //location.href = "http://Localhost:62969/#/Shop/MyOrders/";
                    //LoadingMyOrdersData();
                }
            });

    }
}]);


app.controller('DashboardClothProductController', ['$scope', 'uploadService', '$modal', function ($scope, uploadService, $modal, $log) {

    $scope.$on("update_parent_controller", function (event, message) {
        //        var id = 1;
        // var Gender = uploadService.getGenderBySelProdType(id);
        // Gender.then(function (p1) {
        //     $scope.GenderList = p1.data;
        // }, function (err) {
        // });
        $scope.testing = message;

    });
    //var Gender = uploadService.getGenderBySelProdType(id);
    //Gender.then(function (p1) {
    //$scope.GenderList = p1.data;
    //}, function (err) {
    //});
}]);

//Stage 1
//DashBoard Data Display i'e user selected relative information will be display 

app.controller('DashboardClothProductController1', ['$scope', 'uploadService', '$modal', function ($scope, uploadService, $modal, $log) {
    //GetClothSize
    GetAllProductTypes();
    function GetAllProductTypes() {
        var products = uploadService.getAllProductTypes();
        products.then(function (p1) {
            $scope.ProductList = p1.data;
            $scope.Welcome = 'Welcome to Upload Form';
        }, function (err) {
            alert('Failure to Retrieve Datasss');
        });

        var redirect = uploadService.ResultReditect();
        alert(redirect);

        return products;
    }

    //Rough 
    $scope.ChooseProdtype = function (value) {
        return false;
    }

    //GetClothBrand

    //GetClothColor

    //GetClothNecktype

    //GetClothSleeves

    //GetClothFit

}]);


app.controller('menController', function ($scope) {

    $scope.message = 'This is Add new order screen';

});


app.controller('womanController', function ($scope) {

    $scope.message = 'This is Show orders screen';

});


app.controller('profilectrl', function ($scope) {

    $scope.message = 'This is Add new order screen';
    $scope.Hellomsg = "jingel bel";
});


//Binding ClothGender Directory 
app.directive('clothgenderDir', function ($compile, $http) {
    var getTemplate = function (contentType) {
        var template = '';
        var GenderTemp = '<div class="col-md-6"><label>Select Gender:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-model="Upload.Gender" ng-options="c.Gender for c  in GenderList" ng-change="GetCategoryBySelGender(Upload.Gender.Gender)" ><option value="">Select Gender:</option></select></div>';
        var ErrTemp = '<div><label>Error****</label></div>';
        switch (contentType) {
            case ('Cloths'):
            case ('FootWares'):
                {
                    template = GenderTemp;
                    return template;
                    break;
                }
            default:
                {
                    template = ErrTemp;
                    return template;
                    break;
                }
        }
    }
    return {
        link: function (scope, element, attr) {
            var template = getTemplate(scope.Upload.ProductType.ProdType);
            element.html(template);
            $compile(element.contents())(scope);
        }
    };
    //    return {
    //template: '<div class="col-md-6"><label>Select Gender:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-model="Upload.Gender" ng-options="c.Gender for c  in GenderList" ng-change="GetCategoryBySelGender(Upload.Gender.Gender)" ><option value="">Select Gender:</option></select></div>'
    //}
});

//Binding ClothNecktype Direectory
app.directive('clothnecktypeDir', function ($compile, $http) {
    return {
        template: '<div class="col-md-6"><label>Select NeckType:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-model="Upload.NeckType" ng-options="c.NeckType for c  in NeckTypeList track by c.NeckTypeRefId" ng-disabled="NecktypeDisabled"><option value="">Select NeckType:</option></select></div>'
    }
});

//Binding ClothFit Dircetory
app.directive('clothfitDir', function ($compile, $http) {
    return {
        template: '<div class="col-md-6"><label>Select Fit:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-model="Upload.ClothFit" ng-options="c.FitType for c  in ClothFitList track by c.FitRefId" ng-disabled="FitDisabled"><option value="">Select ClothFit:</option></select></div>'
    }
});

//Binding ClothSleeves
app.directive('clothsleeveDir', function ($compile, $http) {
    return {
        template: '<div class="col-md-6"><label>Select Sleeve:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-model="Upload.ClothSleeves" ng-options="c.SlevesType for c  in ClothSlevesList track by c.SlevesRefId"  ng-disabled="SleevesDisabled" ><option value="">Select Sleeves:</option></select></div>'
    }
});


//ClothMaterialDir
app.directive('clothmaterialDir', function ($compile, $http) {
    return {
        template: '<div class="col-md-6"><label>Select Material:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-init="Upload.ClothMaterial = 0" ng-model="Upload.ClothMaterial" ng-options="m.MaterialType for m in ClothMaterialList track by m.MatRefId" ng-disabled="MaterialDisabled" ><option value="0" >Select Material:</option></select></div>'
    }
});

//ClothOccasionDir
app.directive('clothoccasionDir', function ($compile, $http) {
    return {
        template: '<div class="col-md-6"><label>Select Occasion:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-model="Upload.ClothOccasion" ng-options="O.OccasionType for O in ClothOccasionList track by O.OccasionRefId" ng-disabled="OccasionDisabled"><option value="">Select Occasion:</option></select></div>'
    }
});

//MobileOS Directory
app.directive('mobileosDir', function ($compile, $http) {
    var getTemplate = function (contentType) {
        var template = '';
        var MobileOSTemp = '<div class="col-md-6"><label>Select Mobile OS:</label></div><div class="col-md-6"><select class="btn btn-primary dropdown-toggle" ng-model="Upload.MobileOS" ng-options="c.MobileOSType for c in MobileOSList track by c.MobileOsId" ><option value="">Select Mobile OS:</option></select></div>';
        var ErrTemp = '<div><label>Error****</label></div>';
        switch (contentType) {
            case ('Mobiles'):
                {
                    template = MobileOSTemp;
                    return template;
                    break;
                }
            default:
                {
                    template = ErrTemp;
                    return template;
                    break;
                }
        }
    }
    return {
        link: function (scope, element, attr) {
            var template = getTemplate(scope.Upload.ProductType.ProdType);
            element.html(template);
            $compile(element.contents())(scope);
        }
    };
});

//Dynamically Retrieving Partial Pages
app.directive("partnersInfoView", function ($http) {

    return {
        templateUrl: '/Paytm/DynamicPartials',
        link: function (scope, element, attr) {
            // Do linking
        }
    };

});

//Allow Numbers only in Angularjs 
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input. 
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

//oneToNine only
app.directive('onetoNine', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input. 
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^1-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});




app.controller('ClothProductCtrl', ['$scope', '$window', '$routeParams', 'uploadService', '$modal', '$rootScope', function ($scope, $window, $routeParams, uploadService, $modal, $log, $rootScope) {
    //Get Size
    //Hide menu from child controller
    $scope.$parent.MenuOne = true;
    $scope.$parent.MenuTwo = false;
    //Menu Size Gap
    $scope.$parent.DynamicMenuGap = 'MenuOneGap';
    $scope.ProductCartPage = false;

    var Size = uploadService.getClothSizeContent($routeParams.ItemId);
    Size.then(function (p1) {
        $scope.ClothSizeContent = p1.data;
    }, function (err) {
        alert("Sorry unable to retrieve Size Data");
    });

    //Get Brand
    var Brand = uploadService.getClothBrandContent($routeParams.ItemId);
    Brand.then(function (p1) {
        $scope.ClothBrandContent = p1.data;
    }, function (err) {
        alert("Sorry unable to retrieve Brand Data");
    });
    //GetNecktype
    var Necktype = uploadService.getClothNecktypeContent($routeParams.ItemId);
    Necktype.then(function (p1) {
        $scope.ClothNecktypeContent = p1.data;
    }, function (err) {
        alert("Sorry unable to retrieve Necktype Data");
    });
    //GetSleeves
    var Sleeves = uploadService.getClothSleevesContent($routeParams.ItemId);
    Sleeves.then(function (p1) {
        $scope.ClothSleevesContent = p1.data;
    }, function (err) {
        alert("Sorry unable to retrieve Sleeves Data");
    });
    //GetFit
    var Fit = uploadService.getClothFitContent($routeParams.ItemId);
    Fit.then(function (p1) {
        $scope.ClothFitContent = p1.data;
    }, function (err) {
        alert("Sorry unable to retrieve Fit Data");
    });

    //DashboardCloth

    var DashboardCloth = uploadService.getDashboardcloth($routeParams.ItemId);
    DashboardCloth.then(function (p1) {

        //setTimeout(function () {
        //    $scope.$apply(function () {
        $scope.DashboardClothDetails = p1.data;
        //    });
        //}, 3000);
    }, function (err) {
        alert('sorry, DashboardCloth is not available');
        return false;
    });

    //getSizes
    $scope.getSizes = function () {
        return ($scope.DashboardClothDetails || []).map(function (w) {
            return w.Size;
        }).filter(function (w, idx, arr) {
            return arr.indexOf(w) === idx;
        });
    };

    //getBrand
    $scope.getBrand = function () {
        return ($scope.DashboardClothDetails || []).map(function (w) {
            return w.Brand;
        }).filter(function (w, idx, arr) {
            return arr.indexOf(w) === idx;
        });
    };

    //getNeckType
    $scope.getNeckType = function () {
        return ($scope.DashboardClothDetails || []).map(function (w) {
            return w.NeckType;
        }).filter(function (w, idx, arr) {
            return arr.indexOf(w) === idx;
        });
    };

    //getSleeves
    $scope.getSleeves = function () {
        return ($scope.DashboardClothDetails || []).map(function (w) {
            return w.Sleeves;
        }).filter(function (w, idx, arr) {
            return arr.indexOf(w) === idx;
        });
    };

    //getFit
    $scope.getFit = function () {
        return ($scope.DashboardClothDetails || []).map(function (w) {
            return w.Fit;
        }).filter(function (w, idx, arr) {
            return arr.indexOf(w) === idx;
        });
    };

    $scope.filter = {};
    //SizeFiltering
    $scope.filterBySize = function (item) {

        return $scope.filter[item.Size] || noFilter($scope.filter);
    };

    //BrandFiltering
    $scope.filterByBrand = function (item) {

        return $scope.filter[item.Brand] || noFilter($scope.filter);
    }


    function noFilter(filterObj) {

        for (var key in filterObj) {
            if (filterObj[key]) {
                return false;
            }
        }
        return true;
    }
}]);

//Data factory
app.factory('Data', function () {
    return {
        ItemId: '',
        ItemSize: '',
        ItemCost: '',
        ExpDelDate: '',
        FilePath: '',
        FileName: '',
        ItemsCost: '',
        ProductDescription: '',
        ProductCount: '',
        Status: '',
        Weight: '',
        WantedItemsCount: '',
        Seller: '',
        ShippingCharges: '',
        TotalShipCharge: '',
        OrderPlusShipCharhe: '',
        OutofStockMsg: ''
    };
});

//Notify factory
app.factory('notify', ['$window', function (win) {


    var Fact = [];
    var msgs = [];
    //Fact.data = "";

    //Adding
    Fact.additem = function (msg) {

        msgs.push({
            ProdId: msg.ProdId,
            CategoryId: msg.CategoryId,
            ItemId: msg.ItemId,
            ItemSize: msg.ItemSize,
            ItemCost: msg.ItemCost,
            ShippingCharges: msg.ShippingCharges,
            TotalShipCharge: msg.ShippingCharges,
            FilePath: msg.FilePath,
            FileName: msg.FileName,
            ItemsCost: msg.ItemCost,
            ProductDescription: msg.ProductDescription,
            WantedItemsCount: msg.WantedItemsCount,
            Seller: msg.Seller,
            ProductCount: msg.ProductCount,
            Status: msg.Status,
            Weight: msg.Weight,
            OrderPlusShipCharhe: msg.OrderPlusShipCharhe,
            OutofStockMsg: msg.OutofStockMsg
        });
    };
    //Retrieving
    Fact.RetrieveItems = function () {

        return Fact = msgs;
        //return Fact;
    };
    return Fact;
}]);


//Authentication factory
app.factory('Authentication', function () {
    return {
        EmailId: '',
        Password: ''
    };
});

//Authentication Window factory
app.factory('AuthenticationDetails', ['$window', function (win) {
    var Credential = [];
    var CredDetails = [];

    //Add Credentials
    Credential.AddUserDetails = function (User) {

        CredDetails.push({
            UserName: User.UserName,
            Mobile: User.Mobile,
            EmailId: User.EmailId,
            Password: User.Password
        });
    };

    //Retrieve Credentials
    Credential.RetrieveUserDetails = function () {
        return Credential = CredDetails;
    };
    return Credential;

}]);

//DelivaryAddressDetails
app.factory('DelivaryAddress', function () {
    return {
        PinCode: '',
        ReceiverName: '',
        PrimaryAddress: '',
        Area: '',
        District: '',
        MobileNumber: '',
        AlterMobileNumber: ''
    };
});

//DelivaryAddressDetails Window factory
app.factory('DelivaryAddressDetails', ['$window', function (win) {

    var AddressData = [];
    var AddressDetails = [];

    //Add Credentials
    AddressData.AddUserDetails = function (Address) {

        AddressDetails.push({
            PinCode: Address.PinCode,
            ReceiverName: Address.ReceiverName,
            PrimaryAddress: Address.PrimaryAddress,
            Area: Address.Area,
            District: Address.District,
            MobileNumber: Address.Mobiles,
            AlterMobileNumber: Address.AlterMobileNumber
        });
    };

    //Retrieve Credentials
    AddressData.RetrieveUserDetails = function () {
        return AddressData = AddressDetails;
    };
    return AddressData;
}]);

//ProductSelectedCtrl
app.controller('ProductSelectedCtrl', ['$scope', '$routeParams', 'uploadService', 'Data', 'notify', '$http', function ($scope, $routeParams, uploadService, Data, Fact, $http) {
    //Hide menu from child controller
    $scope.$parent.MenuOne = true;
    $scope.$parent.MenuTwo = false;
    $scope.ShowHideProductSelectedDiv = true;
    $scope.ProductCartPage = false;

    //Dynamic MenuGap
    $scope.$parent.DynamicMenuGap = 'MenuOneGap';

    //Checking loginsession data 
    CheckLoginSession();
    function CheckLoginSession() {
        $http.post('TrackOrder/RetrieveLoginSessionData', {})
            .success(function (data, config) {

                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';
                }
                else {
                    $scope.$parent.LoginEmailId = data.EmailId;
                    $scope.$parent.LoginUsername = data.UserName;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/LogOut';
                }
            });
    };

    var GlobalShippingCharges = 0;
    //Variables Declaration start
    var SelectedDBProductId = $routeParams.ItemId;
    $scope.chkClass = "uncheck";
    $scope.AvailStatus = "NotAvailable";

    $scope.F =
        {
            DefaultPromUncheck: false,
            ShowHideDelivaryCheck: true,
            ShowHideDelivaryResult: false,
            ShippingCharges: false
        }

    //SelectedDBProduct
    $scope.FinalProduct = [];

    $scope.productitems = [];

    var SelectedDBProduct = uploadService.getSelectedDBProduct($routeParams.ItemId);
    SelectedDBProduct.then(function (p1) {
        if (p1.data.length != 0) {

            $scope.ShowHideProductSelectedDiv = true;

            //Assignment to Variables
            $scope.F.ProdId = p1.data.DB[0].ProdId;
            $scope.F.CategoryId = p1.data.DB[0].CategoryId;
            $scope.F.Brand = p1.data.DB[0].Brand;
            $scope.F.ProductDescription = p1.data.DB[0].ProductDescription;
            $scope.F.Size = p1.data.DB[0].Size;
            $scope.F.AfterDiscountCost = p1.data.DB[0].AfterDiscountCost;
            $scope.F.ProductCost = p1.data.DB[0].ProductCost;
            $scope.F.DiscountPercent = p1.data.DB[0].DiscountPercent;
            $scope.F.ItemId = p1.data.DB[0].ItemId;
            $scope.F.Color = p1.data.DB[0].Color;
            $scope.F.Material = p1.data.DB[0].Material;
            $scope.F.Sleeves = p1.data.DB[0].Sleeves;
            $scope.F.Fit = p1.data.DB[0].Fit;

            $scope.DashboardImages = p1.data.DBI;
            $scope.F.FrameImg = p1.data.DB[0].FilePath + p1.data.DB[0].FileName;
            $scope.F.FilePath = p1.data.DB[0].FilePath;
            $scope.F.FileName = p1.data.DB[0].FileName;
            $scope.ProductAvailableSizeList = p1.data.DBSize;

            $scope.F.Seller = p1.data.DB[0].Seller;
            $scope.F.ShippingCharges = p1.data.DB[0].ShippingCharges;
            $scope.F.Weight = p1.data.DB[0].Weight;
            $scope.F.ProductCount = p1.data.DB[0].ProductCount;
            $scope.F.Status = p1.data.DB[0].Status;

            PostProduct();

            GlobalShippingCharges = p1.data.DB[0].ShippingCharges;
        }
        else {
            $scope.ShowHideProductSelectedDiv = false;
        }

    }, function (err) {
        alert('sorry, SelectedDBProduct is not available');
        return false;
    });

    var PostProduct = function () {

        var FormData = transformCombineModel($scope.F);

        $http({
            method: "POST",
            url: '/Shop/GetSelectedDashBoardSize',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        });
    }

    var transformCombineModel = function (data) {

        var dataAsFormData = new FormData();
        window.angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    }

    //Frame images Binding
    $scope.FramsImg = function (SB) {
        $scope.F.FrameImg = SB.FilePath + SB.FileName;
    };

    //Promocode checkbox select Code
    $scope.PromoCodeCheckBtn = function (AfterDiscountCost) {


        if ($scope.F.DefaultPromUncheck === true) {
            var AfterDiscount = 30 / 100;
            $scope.F.PromoDiscount = AfterDiscountCost - (AfterDiscountCost * AfterDiscount);
            $scope.chkClass = "check";
            $scope.visibleEffectivePrice = true;
        }
        else {
            $scope.F.PromoDiscount = AfterDiscountCost;
            $scope.chkClass = "uncheck";
            $scope.visibleEffectivePrice = false;
        }

        var Result = CheckShippingChargeItem();
        $scope.CheckShippingCharge = Result;
    };

    //ProductItem checking if it is available  or not using Status 
    $scope.CheckItemAvailOrNOt = function (itemid) {

        //Retrieving Items from factory Method
        var items = [];
        var AvailableitemId = [];
        items = Fact.RetrieveItems();
        for (var i = 0; i < items.length; i++) {
            AvailableitemId.push(items[i].ItemId);
        }

        //Check if ItemId is Previously Added to Cart Or not
        if (AvailableitemId.indexOf(itemid) != -1) {
            return true;
        }
        else if (AvailableitemId.indexOf(itemid) == -1) {

            if ($scope.F.Status == "N" || $scope.F.ProductCount <= 0) {
                $scope.SoldoutMsg = true;
                return true;
            }
            else {
                $scope.SoldoutMsg = false;
                return false;
            }
        }
        else {
            return false;
        }
    }


    //Checking Delivery Charge Depending On Item Charge
    $scope.CheckShippingCharge = function () {


        if ($scope.F.AfterDiscountCost < 500) {
            $scope.F.ShippingCharges = GlobalShippingCharges;
            return true;
        }
        else {
            $scope.F.ShippingCharges = 0;
            return true;
        }
    }

    //Addint Items TO Cart
    $scope.AddItemBtnToCartInSelectionCtrl = function (F) {
        $scope.PincodeErrMsg = false;
        $scope.SizeErrMsg = false;
        var data = Data;
        data.ProdId = $scope.F.ProdId;
        data.CategoryId = $scope.F.CategoryId;
        data.ItemId = $scope.F.ItemId;
        data.ItemSize = $scope.F.Size;
        data.ItemCost = $scope.F.AfterDiscountCost;
        data.ShippingCharges = $scope.F.ShippingCharges;
        data.FilePath = $scope.F.FilePath;
        data.FileName = $scope.F.FileName;
        data.ProductDescription = $scope.F.ProductDescription;
        data.ProductCount = $scope.F.ProductCount;
        data.Status = $scope.F.Status;
        data.Weight = $scope.F.Weight;
        data.WantedItemsCount = 1;
        data.Seller = $scope.F.Seller;
        data.OrderPlusShipCharhe = $scope.F.ShippingCharges + $scope.F.AfterDiscountCost;
        data.OutofStockMsg = '';


        //notify(data.ItemId);
        Fact.additem(data);
        //location.href = 'http://localhost:62969/#/Shop/Cart/';
        //}
    };

    /*
    Retrieve User Selected the SIZE value
    */
    $scope.ProductSelectedSize = function (size) {
        //$scope.F.SelectedOption = size;
        $scope.F.Size = size;
        $scope.SizeErrMsg = false;
    }

    //Check Delivary Pincdoe
    $scope.CheckDelivaryPincode = function (e, pin, Itemcost) {

        var charcode = e.which;


        if (pin.length > 5) {
            $scope.PincodeErrMsg = false;
            var PincodeResult = uploadService.CheckPinAvailOrNot(pin);
            PincodeResult.then(function (p1) {
                if (p1.data.ShippingCharges != null) {

                    $('#myDiv').slideDown(1000);
                    $scope.COD = p1.data.COD;
                    $scope.Area = p1.data.Area;
                    $scope.AvaiOrNot = 'Available for Delivary at Pincode';
                    $scope.F.ShowHideDelivaryResult = true;
                    $scope.F.ShippingCharges = true;
                    $scope.AvailOrNOtImg = 'correct.jpg';
                    $scope.AvailStatus = 'Available';

                    //alert(window.location.href);
                }
                else {
                    $('#myDiv').slideDown(1000);
                    $scope.AvaiOrNot = 'Not Available for Delivary at Pincode';
                    $scope.F.ShowHideDelivaryResult = true;
                    $scope.F.ShippingCharges = false;
                    $scope.AvailOrNOtImg = 'wrong.jpg';
                    $scope.AvailStatus = 'NotAvailable';
                    $scope.PincodeErrMsg = true;
                }
            }), function (err) {
                alert('Sorry Pincode is Not Checking Right Now');
            };
        }
        else {

            $('#myDiv').slideUp(1000);
            $scope.AvaiOrNot = 'Not Available for Delivary at Pincode';
            $scope.F.ShowHideDelivaryResult = false;
            $scope.F.ShippingCharges = false;
            $scope.AvailOrNOtImg = 'wrong.jpg';
            $scope.AvailStatus = 'NotAvailable';
            $scope.PincodeErrMsg = true;
        }
    }

}]);

//ProductCart Controller
app.controller('ProductCartCtrl', ['$scope', '$routeParams', 'uploadService', 'Data', 'notify', '$http', function ($scope, $routeParams, uploadService, Data, Fact, $http) {


    //Hide menu from child controller
    $scope.$parent.MenuOne = false;
    $scope.$parent.MenuTwo = true;

    //Dynamic menu gap
    $scope.$parent.DynamicMenuGap = 'MenuTwoGap';

    //Checking loginsession data 
    CheckLoginSession();
    function CheckLoginSession() {
        $http.post('TrackOrder/RetrieveLoginSessionData', {})
            .success(function (data, config) {

                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';
                }
                else {
                    $scope.$parent.LoginEmailId = data.EmailId;
                    $scope.$parent.LoginUsername = data.UserName;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/LogOut';
                }
            });
    };

    $scope.CartGrid = false;
    $scope.ProductColor = 'ProductColor';
    $scope.HeaderCartitem = 'HeaderCartitem';
    $scope.BodyCartitem = 'BodyCartitem';
    $scope.Gridding = 'Gridding';

    //GridView
    $scope.GridView = function (View) {

        if (View == 'Grid') {
            $scope.CartGrid = true;
        }
        else {
            $scope.CartGrid = false;
        }
    }

    //Retrieve  All Items From Factory Method.

    var items = [];
    items = Fact.RetrieveItems();

    //User input for how many number of items they want??
    $scope.change = function (value, ShipCharge, Id, index) {


        //checking input value
        if (value == null || value == 0) {
            value = 1;
        }
        //Using this 
        var item = this.item;
        var AvailableProdCount = 0;
        //Checking ProductCount in store
        $http({
            method: "POST",
            url: 'Shop/ProductCountAvailOrNotChecking',
            params: { ItemId: Id }
        }).success(function (data) {
            if (data > 0) {
                AvailableProdCount = data;
                if (value <= data) {
                    $scope.ProductCheckoutBtn = false;
                    //$scope.WarningProductAvailableMsg = '';
                    $scope.CartItems[index].WantedItemsCount = value;
                    $scope.CartItems[index].OutofStockMsg = '';

                    var TempAmount = item.ItemCost * value;
                    var Tempship = item.ShippingCharges * value;

                    item.ItemsCost = TempAmount;
                    item.TotalShipCharge = Tempship;

                    $scope.CartItems[index].ItemsCost = TempAmount;
                    //$scope.CartItems[index].WantedItemsCount = value;
                    $scope.CartItems[index].TotalShipCharge = Tempship;
                    $scope.CartItems[index].OrderPlusShipCharhe = TempAmount + Tempship;


                }
                else {
                    $scope.ProductCheckoutBtn = true;
                    // $scope.WarningProductAvailableMsg = 'You are allow to purchase ' + data + ' item(s) only';
                    $scope.CartItems[index].WantedItemsCount = data;
                    $scope.CartItems[index].OutofStockMsg = 'You are allow to purchase ' + data + ' item(s) only';

                    var TempAmount = item.ItemCost * data;
                    var Tempship = item.ShippingCharges * data;

                    item.ItemsCost = TempAmount;
                    item.TotalShipCharge = Tempship;

                    $scope.CartItems[index].ItemsCost = TempAmount;
                    //$scope.CartItems[index].WantedItemsCount = value;
                    $scope.CartItems[index].TotalShipCharge = Tempship;
                    $scope.CartItems[index].OrderPlusShipCharhe = TempAmount + Tempship;
                }
            }
            else {
                $scope.ProductCheckoutBtn = true;
            }
        });

        //Calculating Order Total Amount Here
        //Storing value in variable
        //var Prodcout = 0;
        //
        //if (value == null || value == 0) {
        //    //value = 1;
        //    Prodcout = 1;
        //}
        ////checking if userwanted count is above avaliable count
        //if (value <= AvailableProdCount) {
        //    Prodcout = value;
        //}
        //else {
        //    Prodcout = AvailableProdCount;
        //}


        //var TempAmount = item.ItemCost * Prodcout;
        //var Tempship = item.ShippingCharges * Prodcout;

        //item.ItemsCost = TempAmount;
        //item.TotalShipCharge = Tempship;

        //$scope.CartItems[index].ItemsCost = TempAmount;
        ////$scope.CartItems[index].WantedItemsCount = value;
        //$scope.CartItems[index].TotalShipCharge = Tempship;
        //$scope.CartItems[index].OrderPlusShipCharhe = TempAmount + Tempship;
    };



    $scope.CartItems = items;
    $scope.Data = Data;
    $scope.BackToProducts = "BerofeBackToProducts1";
    $scope.productitems = [];
    AddItems();
    function AddItems() {
        $scope.productitems.push({
            ItemId: $scope.Data.ItemId
        });
    };
    // Get Total Items
    $scope.getTotalItems = function () {
        return $scope.CartItems.length;
    };

    //RemoveItem
    $scope.RemoveItem = function (index) {

        $scope.CartItems.splice(index, 1);
        $scope.$parent.LayoutCartItemsCount = $scope.CartItems.length;
    }

    //Set Total cart items length in Layout Header
    $scope.$parent.LayoutCartItemsCount = $scope.CartItems.length;

    //SelectItemsCount
    $scope.SelectItemsCount = function (item) {
        alert(item);
    }

    //DelivaryAddressBtn
    $scope.DelivaryAddressBtn = function () {
        $scope.i.itemscartdiv = false;
        $scope.i.addresscartdiv = true;
    };

    //BackToCartBtn
    $scope.BackToCartBtn = function () {
        $scope.i.itemscartdiv = true;
        $scope.i.addresscartdiv = false;
    };
}]);

//ProductDelivaryAddressCtrl controller
app.controller('ProductDelivaryAddressCtrl', ['$scope', '$modal', '$routeParams', 'uploadService', 'Data', 'notify', 'Authentication', 'AuthenticationDetails', 'DelivaryAddress', 'DelivaryAddressDetails', '$http', function ($scope, $modal, $routeParams, uploadService, Data, Fact, Authentication, Credential, DelivaryAddress, AddressData, $http) {

    //Show hide menus in layout page
    $scope.$parent.MenuOne = false;
    $scope.$parent.MenuTwo = true;

    //Dynamic menu gap
    $scope.$parent.DynamicMenuGap = 'MenuTwoGap';

    //Checking Login Information in Delivery Control data
    var UserName = '';
    var EmailId = '';
    var Mobile = '';


    //checking login Sesssion is available or not 
    CheckLoginSession();
    function CheckLoginSession() {
        $http.post('TrackOrder/RetrieveLoginSessionData', {})
            .success(function (data, config) {

                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';
                    $scope.AuthenticationPassed = true;
                    $scope.AuthenticationDivison = true;
                    $scope.Paymenting = true;

                }
                else {
                    UserName = data.UserName;
                    EmailId = data.EmailId;
                    Mobile = data.Mobile;

                    $scope.$parent.LoginEmailId = data.EmailId;
                    $scope.$parent.LoginUsername = data.UserName;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/LogOut';

                    $scope.AuthenticationPassed = false;
                    $scope.AuthenticationDivison = false;
                }
            });
    };

    function LogOutUser() {
        $http.post('TrackOrder/LogoutUserSession', {})
            .success(function (data) {
                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';
                    location.href = "http://localhost:62969/#/Home/Login";
                }
                else {
                    $scope.$parent.LoginUsername = data.EmailId;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/LogOut';
                    location.href = "http://Localhost:62969/#/Shop/MyOrders/";
                }
            });
    };


    //Hide menu from child controller
    $scope.$parent.ProductCartPage = true;
    $scope.ChooseAfterPinbtn = true;

    //Show Hide Address Details
    $scope.Del =
        {
            ConfirmBtn: true
        }
    //Show hide  authentication divison
    $scope.ShowHideAuthenticationDiv = function (div) {

        if (div == 'NewSignup') {
            $scope.ShowExisLogin = false;
            $scope.ShowNewLogin = true;
            $scope.ShowForgetPass = false;
        }
        if (div == 'CancelSignup') {
            $scope.ShowNewLogin = false;
            $scope.ShowExisLogin = true;
            $scope.ShowForgetPass = false;
        }
        if (div == 'ForgetPass') {
            $scope.ShowExisLogin = false;
            $scope.ShowNewLogin = false;
            $scope.ShowForgetPass = true;
        }
        if (div == 'CancelForget') {
            $scope.ShowExisLogin = true;
            $scope.ShowForgetPass = false;

        }
    }

    //Retrieve items 
    var items = [];
    items = Fact.RetrieveItems();

    $scope.$parent.LayoutCartItemsCount = items.length;

    //Show Hide Payment Div using items count
    if (items.length > 0) {
        $scope.HideNoItemsInCartDiv = true;
    }
    else {
        $scope.HideNoItemsInCartDiv = false;
    }

    // Checking User is available or not
    var Userdetail = [];
    Userdetail = Credential.RetrieveUserDetails();
    if (Userdetail.length > 0) {
        $scope.$parent.LoginUsername = Userdetail[0].EmailId;
        $scope.LoginUsername = Userdetail[0].EmailId;
        $scope.UserdetailsData = Userdetail;
        $scope.AuthenticationPassed = false;
        $scope.AuthenticationDivison = false;
    }
    else {
        $scope.AuthenticationPassed = true;
        $scope.AuthenticationDivison = true;
        $scope.Paymenting = true;
    }

    //Retrieve  and save those data from Factory Methods
    $scope.CartItems = items;
    $scope.Data = Data;

    //RemoveItem
    $scope.RemoveItem = function (index) {

        $scope.CartItems.splice(index, 1);
    };

    // Fill Delivary Address by passing PinCode
    $scope.CheckDelivaryPincode = function (e, pin) {

        var charcode = e.which;

        if (pin.length > 5) {
            $scope.ChooseAfterPinbtn = false;
            var PincodeResult = uploadService.CheckPinAvailOrNot(pin);
            PincodeResult.then(function (p1) {
                debugger
                //if (p1.data.ShippingCharges != null) {
                if (p1.data != "" && p1.data != null) {
                    //                    var shipCharge = p1.data.ShippingCharges;
                    //                    var itemslength = items.length;
                    //                    $scope.ShippingCharges = shipCharge * itemslength;
                    var FinalAmountWithAll = CalculateFinalAmount();

                    $scope.WithDeliveryCharge = FinalAmountWithAll + $scope.DelivaryTypeCost;

                    $scope.Del.Area = p1.data.Area;
                    $scope.Del.District = p1.data.District;
                    $scope.Del.ConfirmBtn = false;
                    $scope.Paymenting = false;
                    $scope.NetBankPaymentBtn = false;
                }
                else {
                    $scope.Del.Area = "";
                    $scope.Del.District = "";
                    $scope.Del.ConfirmBtn = true;
                    $scope.ChooseAfterPinbtn = true;
                    $scope.Paymenting = true;
                    $scope.NetBankPaymentBtn = true;
                }
            }), function (err) {
                alert('Sorry Pincode is Not Checking Right Now');
            };
        }
        else {

            $scope.Del.ConfirmBtn = true;
            $scope.ChooseAfterPinbtn = true;
            $scope.Paymenting = true;
            $scope.NetBankPaymentBtn = true;
        }
    }

    //Confirm Address Button Click
    var Address = DelivaryAddress;
    $scope.ShowYourDelivaryAddress = true;
    $scope.ShowPostcardAddress = false;

    //Fill Address Fileds ,when Page Again Loading
    var EditAddress = [];
    EditAddress = AddressData.RetrieveUserDetails();
    if (EditAddress.length > 0) {
        $scope.Del.PinCode = EditAddress[0].PinCode;
        $scope.Del.ReceiverName = EditAddress[0].ReceiverName;
        $scope.Del.Address = EditAddress[0].PrimaryAddress;
        $scope.Del.Area = EditAddress[0].Area;
        $scope.Del.District = EditAddress[0].District;
        $scope.Del.MobileNumber = EditAddress[0].MobileNumber;
        $scope.Del.AlterMobileNumber = EditAddress[0].AlterMobileNumber;
        $scope.ShowYourDelivaryAddress = false;
        $scope.ShowPostcardAddress = true;
    }


    //DeliveryAddressForm
    $scope.DelivaryAddressForm = function (Del) {

        Address.PinCode = $scope.Del.PinCode;
        Address.ReceiverName = $scope.Del.ReceiverName;
        Address.PrimaryAddress = $scope.Del.Address;
        Address.Area = $scope.Del.Area;
        Address.District = $scope.Del.District;
        Address.MobileNumber = $scope.Del.MobileNumber;
        Address.AlterMobileNumber = $scope.Del.AlterMobileNumber;

        if (EditAddress.length == 0) {
            //Send Data To Factory Method for adding
            AddressData.AddUserDetails(Address);
            $scope.ShowYourDelivaryAddress = false;
            $scope.ShowPostcardAddress = true;
            $scope.ChooseAfterPinbtn = false;
        }
        if (EditAddress.length > 0) {
            EditAddress.splice(0, 1);
            AddressData.AddUserDetails(Address);
            $scope.ShowYourDelivaryAddress = false;
            $scope.ShowPostcardAddress = true;
            $scope.ChooseAfterPinbtn = false;
        }
    }


    //EditDelivaryAddress
    $scope.EditDelivaryAddress = function () {
        $scope.ShowYourDelivaryAddress = true;
        $scope.ShowPostcardAddress = false;
    }

    //Delivery Authentication Content Start Here
    $scope.LoginModel = {};
    $scope.NewUserReg = {};
    $scope.POModel = {};
    $scope.PODModel = {};
    $scope.TrackingModel = {};

    $scope.ItemsModel = {
        ItemId: '',
        ItemSize: '',
        ItemCost: '',
        ShippingCharges: '',
        ItemsCost: '',
        ProductDescription: '',
        WantedItemsCount: ''
    };

    //SignIn
    $scope.ReturningCustomer = function (Del) {

        //Assign values to LoginModel 
        $scope.LoginModel.EmailId = $scope.Del.EmailLogin;
        $scope.LoginModel.Password = $scope.Del.PasswordLogin;
        $scope.LoginModel.FormType = 'ExistingCustomer';
        PostProduct($scope.LoginModel);
    };

    //SignUpData
    $scope.NewCustomerSignUp = function (SignUp) {

        //Assign values to LoginModel 

        $scope.NewUserReg.UserName = $scope.SignUp.Username;
        $scope.NewUserReg.Mobile = $scope.SignUp.Mobile;
        $scope.NewUserReg.EmailId = $scope.SignUp.EmailId;
        $scope.NewUserReg.Password = $scope.SignUp.Password;
        $scope.NewUserReg.FormType = 'NewCustomer';
        PostProduct($scope.NewUserReg);
    };

    var PostProduct = function (Form) {

        var URL = '';

        //Declare Factory method
        var User = Authentication;

        if (Form.FormType == 'ExistingCustomer') {
            URL = '/AllProducts/LoginUser';
        }
        else {
            URL = '/AllProducts/NewSignUpData';
        }
        var FormData = transformCombineModel(Form);

        $http({
            method: "POST",
            url: URL,
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {

            if (data.length > 0) {
                debugger;
                User.UserName = data[0].UserName;
                User.Mobile = data[0].Mobile;
                User.EmailId = data[0].EmailId
                User.Password = data[0].Password
                Credential.AddUserDetails(User);
                $scope.LoginFailMsg = '';
                $scope.AuthenticationPassed = false;
                $scope.AuthenticationDivison = false;
                $scope.Paymenting = false;
                //load logindata into Session 
                var FormData = transformCombineModel(User);
                LoadLoginDataintoSession(FormData);
                CheckLoginSession();
            }

            else if (data == 1) {
                debugger;
                //Load login data into session ...
                // LoadLoginDataintoSession(FormData);
                //Logout User
                //LogOutUser();
                User.UserName = $scope.SignUp.Username;
                User.Mobile = $scope.SignUp.Mobile
                User.EmailId = $scope.SignUp.EmailId;
                User.Password = $scope.SignUp.Password;
                Credential.AddUserDetails(User);
                $scope.LoginFailMsg = '';
                $scope.AuthenticationPassed = false;
                $scope.AuthenticationDivison = false;
                $scope.Paymenting = false;
                //load logindata into Session 
                var FormData = transformCombineModel(User);
                LoadLoginDataintoSession(FormData);
                CheckLoginSession();

            }
            else {
                $scope.LoginFailMsg = 'Invalid Email / Password';
                $scope.AuthenticationPassed = true;
                $scope.AuthenticationDivison = true;
                $scope.Paymenting = true;
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

    //Load Login Information into Session
    function LoadLoginDataintoSession(FormData) {

        $http({
            method: "POST",
            url: 'TrackOrder/LoginSession',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        })
           .success(function (data) {
               if (data == 1) {

               };
           });
    };




    //PaymentTypeOver
    $scope.PaymentDivison = 'DebitCard';

    $scope.PaymentTypeOver = function (PaymentType) {
        $scope.PaymentDivison = PaymentType;
    }

    //Dynamic class setting
    $scope.isSelected = function (PaymentType) {
        return $scope.selected === PaymentType;
    }

    //ForgetPasswordBtn
    $scope.ForgetPasswordBtn = function () {
        alert('forget');
    }

    //Loading Data
    $scope.people = [{
        Type: "Normal", Cost: 0, Time: 5
    }, {
        Type: "Speed", Cost: 80, Time: 2
    }, {
        Type: "High", Cost: 120, Time: 1
    }];

    //CalculateFinal Amount Function 
    function CalculateFinalAmount() {

        var items = $scope.CartItems;
        var WithDelivery = 0;
        var TotalShipcharge = 0;
        for (var i = 0; i < items.length; i++) {
            WithDelivery = WithDelivery + items[i].ItemsCost;
            TotalShipcharge = TotalShipcharge + items[i].TotalShipCharge;
        }
        $scope.POShowPrice = WithDelivery;
        $scope.ShippingCharges = TotalShipcharge;
        var finalamount = WithDelivery + TotalShipcharge;
        return finalamount;
    }

    //Calculate Final Amount
    $scope.selectDeliveryType = function (type) {

        $scope.DelivaryTypeCost = type.Cost;
        $scope.DelivaryType = type.Type;
        var SelectedValue = type.Cost;

        var FinalAmountWithAll = CalculateFinalAmount();

        //var items = $scope.CartItems;
        //var WithDelivery = 0;
        //for (var i = 0; i < items.length; i++) {
        //    WithDelivery = WithDelivery + items[i].ItemsCost;
        //}
        //$scope.POShowPrice = WithDelivery;
        //var finalamount = WithDelivery + SelectedValue + $scope.ShippingCharges;
        //$scope.WithDeliveryCharge = finalamount;
        $scope.WithDeliveryCharge = FinalAmountWithAll + SelectedValue;




        $scope.Paymenting = false;

        var DeliveryDate = new Date(DeliveryDateFinding($scope.DelivaryType));

        $scope.ApproximateDeliveryDate = DeliveryDate;
        $scope.DeliveryDay = DeliveryDay(DeliveryDate.getDay());
    };

    //Finding Delivery Date
    var DeliveryDateFinding = function (DType) {
        var Today = new Date();
        var NextDate = new Date(Today);
        var NotAvailableDays = [0];

        var AddedDays = 0;
        var ApproximateDeliveryDate = "";
        if ($scope.DelivaryType == "Normal") {
            AddedDays = $scope.people[0].Time;
            ApproximateDeliveryDate = NextDate.setDate(Today.getDate() + AddedDays);
            if (NotAvailableDays.indexOf(NextDate.getDay()) != -1) {
                ApproximateDeliveryDate = NextDate.setDate(Today.getDate() + AddedDays + 1);
            }
        }
        else if ($scope.DelivaryType == "Speed") {
            AddedDays = $scope.people[1].Time;
            ApproximateDeliveryDate = NextDate.setDate(Today.getDate() + AddedDays);
            if (NotAvailableDays.indexOf(NextDate.getDay()) != -1) {
                ApproximateDeliveryDate = NextDate.setDate(Today.getDate() + AddedDays + 1);
            }
        }
        else if ($scope.DelivaryType == "High") {
            AddedDays = $scope.people[2].Time;
            ApproximateDeliveryDate = NextDate.setDate(Today.getDate() + AddedDays);
            if (NotAvailableDays.indexOf(NextDate.getDay()) != -1) {
                ApproximateDeliveryDate = NextDate.setDate(Today.getDate() + AddedDays + 1);
            }
        }
        else {
            alert("please select your delivary type first");
        }
        return ApproximateDeliveryDate;
    };

    //Finding Delivery Day
    var DeliveryDay = function (day) {
        var WeekDay = "";
        switch (day) {
            case (0):
                {
                    WeekDay = 'Sunday';
                    break;
                }
            case (1):
                {
                    WeekDay = 'Monday';
                    break;
                }
            case (2):
                {
                    WeekDay = 'Tuesday';
                    break;
                }
            case (3):
                {
                    WeekDay = 'Wednesday';
                    break;
                }
            case (4):
                {
                    WeekDay = 'Thursday';
                    break;
                }
            case (5):
                {
                    WeekDay = 'Friday';
                    break;
                }
            case (6):
                {
                    WeekDay = 'Saturday';
                    break;
                }
            default:
                {
                    WeekDay = 'Wrong in Delivery';
                    break;
                }
        }
        return WeekDay;

    }

    //CheckingDate value
    function DateTimeCheck(dt) {
        var change = '';
        if (dt < 10) {
            change = "0" + dt;
        }
        else {
            change = dt
        }
        return change;
    }

    //Checking TimeValue

    //PaymentGateway Div clicking
    $scope.PaymentGateWayDiv = function () {
        if ($scope.DelivaryTypeCost == undefined) {
            $scope.Paymenting = true;
        }
        else {
            $scope.Paymenting = false;
        }
    };

    //StoreOrderPaymentBtn
    $scope.PaymentGateWaySubmission = function (Card) {

        $scope.POModel = {};
        var Today = new Date();
        //UserData
        var UserData = [];
        UserData = Userdetail;

        //PurchaseOrder
        var itemsData = [];
        itemsData = $scope.CartItems;

        //Retrieve Delivery Type Values
        var DeliveryDate = new Date(DeliveryDateFinding($scope.DelivaryType));

        var yy = Today.getFullYear();
        var mm = DateTimeCheck((Today.getMonth() + 1));
        var dd = DateTimeCheck(Today.getDate());
        var hh = DateTimeCheck(Today.getHours());
        var mi = DateTimeCheck(Today.getMinutes());
        var ss = DateTimeCheck(Today.getSeconds());

        var Dyy = DeliveryDate.getFullYear();
        var Dmm = DateTimeCheck((DeliveryDate.getMonth() + 1));
        var Ddd = DateTimeCheck(DeliveryDate.getDate());

        var PODate = mm + "/" + dd + "/" + yy;
        var POTime = hh + ":" + mi + ":" + ss;
        var PODelivaryDate = Dmm + "/" + Ddd + "/" + Dyy;

        var POID = mm + "" + dd + "" + hh + "" + mi + "" + ss;

        $scope.POModel.POId = POID;
        $scope.POModel.PODate = PODate;
        $scope.POModel.POTime = POTime;
        //$scope.POModel.OrderedBy = UserData[0].UserName;
        //$scope.POModel.MobileNumber = UserData[0].Mobile;
        //$scope.POModel.EmailId = UserData[0].EmailId;

        $scope.POModel.OrderedBy = UserName;
        $scope.POModel.MobileNumber = $scope.Del.MobileNumber;
        $scope.POModel.EmailId = EmailId;


        $scope.POModel.PODeliveryDate = PODelivaryDate;
        $scope.POModel.POShippingVia = "Myshopping";
        $scope.POModel.POShowPrice = $scope.POShowPrice;
        $scope.POModel.PODeliveryCharge = $scope.DelivaryTypeCost;
        $scope.POModel.POAmount = $scope.WithDeliveryCharge
        $scope.POModel.PODeliveryType = $scope.DelivaryType;
        $scope.POModel.POBackStatus = 1;
        $scope.POModel.PinCode = $scope.Del.PinCode;
        $scope.POModel.ReceiverName = $scope.Del.ReceiverName;
        $scope.POModel.PrimaryAddress = $scope.Del.Address;
        $scope.POModel.Area = $scope.Del.Area;
        $scope.POModel.District = $scope.Del.District;
        $scope.POModel.AlterMobileNumber = $scope.Del.AlterMobileNumber;
        $scope.POModel.PaymentDivison = $scope.PaymentDivison;
        $scope.POModel.ShippingCharges = $scope.ShippingCharges;

        var FormData = transformCombineModel($scope.POModel);
        $http({
            method: "POST",
            url: 'AllProducts/InsertPurchaseData',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {

            if (data == 1) {
                //For loop for Accept Items and send to AddToItemsModel FUNCTION
                var TestingModel = [];
                for (var i = 0; i < items.length  ; i++) {

                    //AddToItemsModel(items[i]);
                    $scope.PODModel[i] = {
                        POId: '',
                        PODate: '',
                        POTime: '',
                        EmailId: '',
                        PODeliveryDate: '',
                        PODeliveryType: '',
                        POShippingVia: '',
                        POItemId: '',
                        POItemSize: '',
                        POItemCost: '',
                        POItemCount: '',
                        POAmount: '',
                        POBackStatus: '',
                        POReturnWithInDate: '',
                        FilePath: '',
                        FileName: '',
                        ProductDescription: '',
                        POShipCharge: '',
                        ProdId: '',
                        CategoryId: '',
                        ReceiverName: '',
                        PrimaryAddress: '',
                        Area: '',
                        District: '',
                        MobileNumber: '',
                        AlterMobileNumber: '',
                        PinCode: ''
                    };

                    $scope.PODModel[i].POId = POID;
                    $scope.PODModel[i].PODate = PODate;
                    $scope.PODModel[i].POTime = POTime;
                    $scope.PODModel[i].EmailId = EmailId;
                    $scope.PODModel[i].PODeliveryDate = PODelivaryDate;
                    $scope.PODModel[i].PODeliveryType = $scope.DelivaryType;
                    $scope.PODModel[i].POShippingVia = "Myshopping";
                    $scope.PODModel[i].POItemId = items[i].ItemId;
                    $scope.PODModel[i].POItemSize = items[i].ItemSize;
                    $scope.PODModel[i].POItemCost = items[i].ItemCost;
                    $scope.PODModel[i].POItemCount = items[i].WantedItemsCount;
                    $scope.PODModel[i].POAmount = items[i].OrderPlusShipCharhe;
                    $scope.PODModel[i].POBackStatus = 1;
                    $scope.PODModel[i].POReturnWithInDate = $scope.DelivaryType;
                    $scope.PODModel[i].FilePath = items[i].FilePath;
                    $scope.PODModel[i].FileName = items[i].FileName;
                    $scope.PODModel[i].ProductDescription = items[i].ProductDescription;
                    $scope.PODModel[i].POShipCharge = items[i].TotalShipCharge;
                    $scope.PODModel[i].ProdId = items[i].ProdId;
                    $scope.PODModel[i].CategoryId = items[i].CategoryId;

                    $scope.PODModel[i].ReceiverName = $scope.Del.ReceiverName;
                    $scope.PODModel[i].PrimaryAddress = $scope.Del.Address;
                    $scope.PODModel[i].Area = $scope.Del.Area;
                    $scope.PODModel[i].District = $scope.Del.District;
                    $scope.PODModel[i].MobileNumber = $scope.Del.MobileNumber;
                    $scope.PODModel[i].AlterMobileNumber = $scope.Del.AlterMobileNumber;
                    $scope.PODModel[i].PinCode = $scope.Del.PinCode;

                    TestingModel.push($scope.PODModel[i]);
                }
                var url = 'AllProducts/InsertPurchaseOrderDetailsData';

                $http({
                    method: "POST",
                    url: url,
                    //  headers: { "Content-Type": undefined },
                    // transformRequest: window.angular.identity,
                    data: TestingModel
                    //}).success(function (data, status, headers, config) {
                }).success(function (data) {

                    if (data == 1) {
                        //For loop for Accept Items and send to AddToItemsModel FUNCTION

                        var TrackingOrderStatus = [];
                        for (var i = 0; i < items.length  ; i++) {

                            //AddToItemsModel(items[i]);
                            $scope.TrackingModel[i] = {
                                POId: '',
                                POItemId: '',
                                PODate: '',
                                POTime: '',
                                PODeliveryDate: '',
                                PODeliveryType: '',
                                POBackStatus: '',
                                Area: '',
                                PinCode: '',
                                ProcConf: '',
                                ProcConfDate: '',
                                ProcConfTime: '',
                                ProcPacked: '',
                                ProcPackDate: '',
                                ProcPackTime: '',
                                ProcDispatched: '',
                                ProcDispDate: '',
                                ProcDispTime: '',
                                ShipBy: '',
                                ShipDate: '',
                                ShipTime: '',
                                ShippingItemId: '',
                                ProdId: '',
                                CategoryId: ''
                            };

                            $scope.TrackingModel[i].POId = POID;
                            $scope.TrackingModel[i].POItemId = items[i].ItemId;
                            $scope.TrackingModel[i].PODate = PODate;
                            $scope.TrackingModel[i].POTime = POTime;
                            $scope.TrackingModel[i].PODeliveryDate = PODelivaryDate;
                            $scope.TrackingModel[i].PODeliveryType = $scope.DelivaryType;
                            $scope.TrackingModel[i].POBackStatus = 1;
                            $scope.TrackingModel[i].Area = $scope.Del.Area;
                            $scope.TrackingModel[i].PinCode = $scope.Del.PinCode;
                            $scope.TrackingModel[i].ProcConf = "";
                            $scope.TrackingModel[i].ProcConfDate = "";
                            $scope.TrackingModel[i].ProcConfTime = "";
                            $scope.TrackingModel[i].ProcPacked = "";
                            $scope.TrackingModel[i].ProcPackDate = "";
                            $scope.TrackingModel[i].ProcPackTime = "";
                            $scope.TrackingModel[i].ProcDispatched = "";
                            $scope.TrackingModel[i].ProcDispDate = "";
                            $scope.TrackingModel[i].ProcDispTime = "";
                            $scope.TrackingModel[i].ShipBy = "";
                            $scope.TrackingModel[i].ShipDate = "";
                            $scope.TrackingModel[i].ShipTime = "";
                            $scope.TrackingModel[i].ShippingItemId = "";
                            $scope.TrackingModel[i].ProdId = items[i].ProdId;
                            $scope.TrackingModel[i].CategoryId = items[i].CategoryId;

                            TrackingOrderStatus.push($scope.TrackingModel[i]);
                        }
                        var url = 'AllProducts/InsertTrackingOrderStatusData';

                        $http({
                            method: "POST",
                            url: url,
                            //  headers: { "Content-Type": undefined },
                            // transformRequest: window.angular.identity,
                            data: TrackingOrderStatus
                            //}).success(function (data, status, headers, config) {
                        }).success(function (data) {

                            if (data == 1) {
                                $http({
                                    method: "POST",
                                    url: 'TrackOrder/SummeryOrderSession',
                                    headers: { "Content-Type": undefined },
                                    transformRequest: window.angular.identity,
                                    data: FormData
                                }).success(function (data) {
                                    location.href = "http://localhost:62969/#/Shop/OrderSummary";
                                });
                            }
                            else {
                                alert('again false');
                            }
                        });
                        //location.href = "http://localhost:62969/#/Shop/OrderSummary";
                    }
                    else {
                        alert('first is false failure');
                    }
                });

            }
            else {
                alert('error in first');
            }
        });
    }
}]);


//OrderSummaryCtrl
app.controller('OrderSummaryCtrl', ['$scope', '$http', 'DelivaryAddress', 'DelivaryAddressDetails', 'Data', 'notify', function ($scope, $http, DelivaryAddress, AddressData, Data, Fact) {

    $scope.$parent.ProductCartPage = false;
    $scope.$parent.MenuOne = true;
    $scope.$parent.MenuTwo = false;
    //Menu Size Gap
    $scope.$parent.DynamicMenuGap = 'MenuOneGap';

    $scope.SessionData = false;
    $scope.SessionDataNull = false;
    $scope.ErrorInSession = false;

    //Load  TrackOrder page by previously stored session information
    // and retriving PurchaseOrder and PurchaseOrderDetails Data to show the ORDERSUMMARY
    LoadLiveOrder();
    function LoadLiveOrder() {

        $http.post('TrackOrder/SummeryLiveOrder', {})
            .success(function (data) {
                if (data) {

                    //Show SessionDataNull Div
                    $scope.SessionData = true;
                    //Bind Data to Scope Object
                    $scope.POrderResult = data.POLiveRecord[0];
                    $scope.POrderDetailsResult = data.PODLiveRecord;
                }
                else if (data == 0) {
                    alert('Your Session is Expired');
                    $scope.SessionDataNull = true;
                }
                else {
                    alert('There is a problem right now, Please visit again');
                    $scope.ErrorInSession = true;
                }
            });
    };

    //Checking loginsession data 
    CheckLoginSession();
    function CheckLoginSession() {
        $http.post('TrackOrder/RetrieveLoginSessionData', {})
            .success(function (data, config) {

                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';
                }
                else {
                    $scope.$parent.LoginEmailId = data.EmailId;
                    $scope.$parent.LoginUsername = data.UserName;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/LogOut';
                }
            });
    };

    $scope.OrderAcceptedStatus = function (status) {


        if (status == 1 || status == 2 || status == 3 || status == 4 || status == 5 || status == 6 || status == 7) {
            return true;
        }
        else {
            return false;
        }
    };

    //Show OrderProcessing Status
    $scope.OrderProcessing = function (status) {
        if (status == 4 || status == 5 || status == 6 || status == 7) {
            return true;
        }
        else {
            return false;
        }
    };

    //Show OrderTransit Status
    $scope.OrderTransit = function (status) {

        if (status == 5 || status == 6 || status == 7) {
            return true;
        }
        else {
            return false;
        }
    };

    //Show OrderTransit Status
    $scope.OrderDelivered = function (status) {
        if (status == 7) {
            return true;
        }
        else {
            return false;
        }
    };
}]);

//TrackOrderCtrl
app.controller('TrackOrderLiveCtrl', ['$scope', '$http', function ($scope, $http) {

    //popup Display for showing status of the order
    $scope.Approval = {
        templateUrl: 'myPopoverTemplate.html',
        dateinfo: '',
        timeinfo: '',
        Statusinfo: '',
        StatusMsg: '',
        ShipBy: '',
        DeliveryArea: ''
    };

    //Show Menu Depending on Controller page
    $scope.$parent.MenuOne = true;
    $scope.$parent.MenuTwo = false;
    //Menu Size Gap
    $scope.$parent.DynamicMenuGap = 'MenuOneGap';

    //Checking loginsession data 
    CheckLoginSession();
    function CheckLoginSession() {
        $http.post('TrackOrder/RetrieveLoginSessionData', {})
            .success(function (data, config) {

                if (data == 0 || data == null || data == "") {
                    $scope.$parent.LoginUsername = 'Guest';
                    $scope.$parent.LoginLogoutHrefText = 'Login';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/Login';
                    location.href = "http://localhost:62969/#/Home/Login";
                }
                else {
                    $scope.$parent.LoginEmailId = data.EmailId;
                    $scope.$parent.LoginUsername = data.UserName;
                    $scope.$parent.LoginLogoutHrefText = 'Logout';
                    $scope.$parent.LoginLogoutHrefBtn = '#/Home/LogOut';
                    //Loading Page
                    LoadingLiveOrderStatus();
                }
            });
    };


    //This Function is used to show only the product Tracking Status .
    //it show only the Order Details ,which is not Delivered to the User
    var datalength = 0;
    function LoadingLiveOrderStatus() {
        $http.post('TrackOrder/RetrevingLiveOrdersData', {})
            .success(function (data) {

                if (data) {

                    datalength = data.length;
                    $scope.TrackLiveOrder = data;
                    $scope.FutureDeliverItemsCount = data.length;
                    $scope.IsOrderDeliverStatus = true;
                    //PAGGING CODE START

                    $scope.viewby = 1;
                    $scope.totalItems = datalength;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 1;
                    $scope.maxSize = 3; //Number of pager buttons to show

                    //PAGGING CODE END
                }
                else if (data == 0) {
                    alert('Your Session is Expired');
                    location.href = "http://localhost:62969/#/Home/Login";

                    $scope.IsOrderDeliverStatus = false;
                }
                else {
                    alert('There is a problem right now, Please visit again');
                    $scope.IsOrderDeliverStatus = false;
                    location.href = "http://localhost:62969/#/Home/Login";
                }
            });
    };


    //changeDateFormate
    $scope.changeDateFormate = function (date, time) {
        var DateInformation = '';
        var Time = '';

        var mm = date.split('/')[0];
        var dd = date.split('/')[1];
        var yy = date.split('/')[2];

        var hh = time.split(':')[0];
        var mi = time.split(':')[1];

        var month = FindMonthName(mm);

        var Time = TimeCheck(hh, mi);

        return DateInformation = dd + "'" + month + "'" + yy + "  " + Time;
    }

    //find monthname
    function FindMonthName(month) {

        var MonthName = '';
        switch (month) {
            case ("01"):
            case ("1"):
                {
                    MonthName = 'Jan';
                    break;
                }
            case ("02"):
            case ("2"):
                {
                    MonthName = 'Feb';
                    break;
                }
            case ("03"):
            case ("3"):
                {
                    MonthName = 'Mar';
                    break;
                }
            case ("04"):
            case ("4"):
                {
                    MonthName = 'Apr';
                    break;
                }
            case ("05"):
            case ("5"):
                {
                    MonthName = 'May';
                    break;
                }
            case ("06"):
            case ("6"):
                {
                    MonthName = 'Jun';
                    break;
                }
            case ("07"):
            case ("7"):
                {
                    MonthName = 'Jul';
                    break;
                }
            case ("08"):
            case ("8"):
                {
                    MonthName = 'Aug';
                    break;
                }
            case ("09"):
            case ("9"):
                {
                    MonthName = 'Sep';
                    break;
                }
            case ("10"):
                {
                    MonthName = 'Oct';
                    break;
                }
            case ("11"):
                {
                    MonthName = 'Nov';
                    break;
                }

            case ("12"):
                {
                    MonthName = 'Dec';
                    break;
                }

            default:
                {
                    break;
                }
        }
        return MonthName;
    }
    //FindTime
    function TimeCheck(hh, mi) {

        var parsehh = parseInt(hh);
        var time = '';
        if (parsehh <= 12) {
            time = parsehh + ":" + mi + "'AM'";
        }
        if (parsehh > 12) {
            parsehh = parsehh - 12;
            time = "0" + parsehh + ":" + mi + "'PM'";
        }
        return time;
    }

    //pageing
    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    //Checking OrderApprovedFunction
    $scope.TrackOrder = {};

    $scope.Approved = function (pid, itemid, statusbtn) {

        var FormData = RetrevingOrderIndividualStatus(pid, itemid);
        var url = 'TrackOrder/TrackingOrderStatus';
        $http({
            method: "POST",
            url: url,
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {
            if (data != null) {

                BindingDataTOStatusTooltip(data, statusbtn);
                $scope.StatusDisplayDiv = true;
            }
            else {
                $scope.StatusDisplayDiv = false;
            }
        });
    };


    //Show hide HideStatusDiv
    $scope.HideStatusDiv = function () {
        $scope.StatusDisplayDiv = false;
    };

    //BindingDataTOStatusTooltip(data);
    function BindingDataTOStatusTooltip(data, statusbtn) {
        if (statusbtn == 'Placed') {
            $scope.Approval.dateinfo = data.PODate;
            $scope.Approval.timeinfo = data.POTime;
            $scope.Approval.Statusinfo = TrackingOrderDescription(data.POBackStatus);
            $scope.Approval.StatusMsg = TrackingOrderMsg(data.POBackStatus);
            $scope.Approval.ShipBy = "";
            $scope.Approval.ShippingItemId = "";
        }
        else if (statusbtn == 'Confirmed') {

            $scope.Approval.dateinfo = data.ProcConfDate;
            $scope.Approval.timeinfo = data.ProcConfTime;
            $scope.Approval.Statusinfo = TrackingOrderDescription(data.ProcConf);
            $scope.Approval.StatusMsg = TrackingOrderMsg(data.ProcConf);
            $scope.Approval.ShipBy = "";
            $scope.Approval.ShippingItemId = "";
        }
        else if (statusbtn == 'Packed') {
            $scope.Approval.dateinfo = data.ProcPackDate;
            $scope.Approval.timeinfo = data.ProcPackTime;
            $scope.Approval.Statusinfo = TrackingOrderDescription(data.ProcPacked);
            $scope.Approval.StatusMsg = TrackingOrderMsg(data.ProcPacked);
            $scope.Approval.ShipBy = "";
            $scope.Approval.ShippingItemId = "";
        }
        else if (statusbtn == 'Dispatched') {
            $scope.Approval.dateinfo = data.ProcDispDate;
            $scope.Approval.timeinfo = data.ProcDispTime;
            $scope.Approval.Statusinfo = TrackingOrderDescription(data.ProcDispatched);
            $scope.Approval.StatusMsg = TrackingOrderMsg(data.ProcDispatched);
        }
        else if (statusbtn == 'InGoods') {

            $scope.Approval.ShipBy = data.ShipBy;
            $scope.Approval.dateinfo = data.ShipDate;
            $scope.Approval.timeinfo = data.ShipTime;
            $scope.Approval.ShippingItemId = data.ShippingItemId;
            $scope.Approval.Statusinfo = TrackingOrderDescription(data.ShippingStatus);
            $scope.Approval.StatusMsg = TrackingOrderMsg(data.ShippingStatus);
            $scope.Approval.DeliveryArea = data.DeliveryArea;
        }
        else if (statusbtn == 'NearToYou') {
            $scope.Approval.ShipBy = data.ShipBy;
            $scope.Approval.dateinfo = data.ShipDate;
            $scope.Approval.timeinfo = data.ShipTime;
            $scope.Approval.ShippingItemId = data.ShippingItemId;
            $scope.Approval.Statusinfo = TrackingOrderDescription(data.ShippingStatus);
            $scope.Approval.StatusMsg = TrackingOrderMsg(data.ShippingStatus);
            $scope.Approval.DeliveryArea = data.DeliveryArea;
        }
        else if (statusbtn == 'Delivered') {
            $scope.Approval.dateinfo = data.DeliveredDate;
            $scope.Approval.timeinfo = data.DeliveredTime;
            $scope.Approval.Statusinfo = TrackingOrderDescription(data.DeliveredStatus);
            $scope.Approval.StatusMsg = TrackingOrderMsg(data.DeliveredStatus);
            $scope.Approval.DeliveryArea = data.DeliveryArea;
        }
        else {

        }
    }

    //RetrevingOrderIndividualStatus
    function RetrevingOrderIndividualStatus(pid, itemid) {
        $scope.TrackOrder.POId = pid;
        $scope.TrackOrder.POItemId = itemid;
        var FormData = transformCombineModel($scope.TrackOrder);
        return FormData;
    }


    //TrackingOrderMsg
    function TrackingOrderMsg(status) {

        if (status == 1) {
            return 'Your item has been Placed';
        }
        else if (status == 2) {
            return 'Your item has been Confirmed';
        }
        else if (status == 3) {
            return 'Your item has been Packed';
        }
        else if (status == 4) {
            return 'Your item has been Dispatched';
        }
        else if (status == 5) {
            return 'Your item shipped';
        }
        else if (status == 6) {
            return 'Your item is receieved at the Hub Near To you';
        }
        else if (status == 7) {
            return 'Your item has been Delivered';
        }
        else
            return 'Your item is in Processing...Please Visit again';

        //if (status == 1 || status == 2 || status == 3 || status == 4 || status == 5 || status == 6 || status == 7) {
        //    return 'You item has been Placed';
        //}
        //else if (status == 2 || status == 3 || status == 4 || status == 5 || status == 6 || status == 7) {
        //    return 'You item has been Confirmed';
        //}
        //else if (status == 3 || status == 4 || status == 5 || status == 6 || status == 7) {
        //    return 'You item has been Packed';
        //}
        //else if (status == 4 || status == 5 || status == 6 || status == 7) {
        //    return 'You item has been Dispatched';
        //}
        //else if (status == 5 || status == 6 || status == 7) {
        //    return 'You item shipped';
        //}
        //else if (status == 6 || status == 7) {
        //    return 'You item is near to you';
        //}
        //else if (status == 7) {
        //    return 'You item has been Delivered';
        //}
        //else
        //    return 'Your item is not ready to Delivery';
    };

    function TrackingOrderDescription(status) {

        if (status == 1) {
            return 'Payment Approved';
        }
        else if (status == 2) {
            return 'Item has been confirmed by seller';
        }
        else if (status == 3) {
            return 'item has been Packed';
        }
        else if (status == 4) {
            return 'item has been Dispatched from the Seller warehouse';
        }
        else if (status == 5) {
            return 'Delivered to Customer';
        }
        else if (status == 6) {
            return 'Delivered to Customer';
        }
        else if (status == 7) {
            return 'You item has been Delivered';
        }
        else
            return 'Your item is in Processing...Please Visit again';
    };

    //Creatinf Form Data
    var transformCombineModel = function (data) {

        var dataAsFormData = new FormData();
        window.angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    }

    //Show OrderAccepted Status
    $scope.OrderAcceptedStatus = function (status) {

        if (status == 1 || status == 2 || status == 3 || status == 4 || status == 5 || status == 6 || status == 7) {
            return true;
        }
        else {
            return false;
        }
    };

    //Show OrderProcessing Status
    $scope.OrderProcessing = function (status) {
        if (status == 4 || status == 5 || status == 6 || status == 7) {
            return true;
        }
        else {
            return false;
        }
    };

    //Show OrderTransit Status
    $scope.OrderTransit = function (status) {
        if (status == 5 || status == 6 || status == 7) {
            return true;
        }
        else {
            return false;
        }
    };

    //Show OrderTransit Status
    $scope.OrderDelivered = function (status) {
        if (status == 7) {
            return true;
        }
        else {
            return false;
        }
    };

}]);

app.controller('TrackOrderHistoryCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    //Retreving POId, POItemId for showing History Data...

    var pid = $routeParams.POId;
    var itemid = $routeParams.POItemId;

    $scope.TrackOrder = {};

    //RetrevingOrderIndividualStatus
    function RetrevingOrderIndividualStatus(pid, itemid) {
        $scope.TrackOrder.POId = pid;
        $scope.TrackOrder.POItemId = itemid;
        var FormData = transformCombineModel($scope.TrackOrder);
        return FormData;
    }

    //Creatinf Form Data
    var transformCombineModel = function (data) {

        var dataAsFormData = new FormData();
        window.angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    };

    //loading function 
    LoadingHistortOrderData(pid, itemid);

    function LoadingHistortOrderData(pid, itemid) {

        var FormData = RetrevingOrderIndividualStatus(pid, itemid);
        $http.post({
            method: "GET",
            url: 'TrackOrder/RetrevingHistoryOrderData',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {
            $scope.TrackOrderHistoryData = data;
        });
    };


}]);

//MyOrdersCtrl
app.controller('MyOrdersCtrl', ['$scope', '$http', function ($scope, $http) {
    //Hide Div
    $scope.MyOrdersDiv = false;
    //Menu size gap
    $scope.$parent.MenuOne = true;
    $scope.$parent.MenuTwo = false;
    //Menu Size Gap
    $scope.$parent.DynamicMenuGap = 'MenuOneGap';

    $scope.TrackOrder = {};

    //Checking Login is available in Session Or not 

    CheckLoginSession();
    function CheckLoginSession() {

        $http.post('TrackOrder/CheckLoginSession', {})
            .success(function (data) {
                if (data == 0 || data == "" || data == null) {
                    $scope.MyOrdersDiv = false;
                    location.href = "http://localhost:62969/#/Home/Login";
                }
                else {
                    location.href = "http://Localhost:62969/#/Shop/MyOrders/";
                    LoadingMyOrdersData();
                }
            });
    };

    //Loading MyOrders Data ,when session is not null
    function LoadingMyOrdersData() {
        $http.post('TrackOrder/LoadingMyOrdersData', {})
            .success(function (data) {
                if (data.length > 0) {
                    $scope.MyOrdersPurchaseOrderDetails = data;
                    $scope.MyOrdersDiv = true;
                }
                else {
                    $scope.MyOrdersDiv = false;
                }
            });
    };

    $scope.Approved = function (pid, itemid, index) {
        alert(index);
        var result = '';
        var FormData = RetrevingOrderIndividualStatus(pid, itemid);
        var url = 'TrackOrder/TrackingOrderStatus';
        $http({
            method: "POST",
            url: url,
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {
            if (data.DeliveredDate != null) {

                result = data.DeliveredDate;
            }
            else {
                result = 'Not Delivered to you';
            }
        });
        return result;
    };

    function RetrevingOrderIndividualStatus(pid, itemid) {
        $scope.TrackOrder.POId = pid;
        $scope.TrackOrder.POItemId = itemid;
        var FormData = transformCombineModel($scope.TrackOrder);
        return FormData;
    };

    //FormData Formation 
    var transformCombineModel = function (data) {

        var dataAsFormData = new FormData();
        window.angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    }
}]);

//LandingLoginCtrl
app.controller('LandingLoginCtrl', function ($scope, $http, $rootScope, $window) {
    //Show Hide Contents
    $scope.LoginErrImg = false;
    //Hide Two menus in LoginPage
    $scope.$parent.MenuOne = false;
    $scope.$parent.MenuTwo = false;
    $scope.$parent.DynamicMenuGap = 'MenuTwoGap';

    //loading time show/hide div's    
    $scope.ShowSignInMenu = true;
    $scope.ShowSignUpMenu = false;
    $scope.GmailSignupFormShow = false;
    $scope.GmailSigninFormShow = false;



    //Show Current Login/Signup type div
    $scope.GmailSignInDivClick = function () {
        $scope.ShowSignInMenu = false;
        $scope.GmailSigninFormShow = true;
    };

    $scope.GmailSignUpDivClick = function () {
        $scope.ShowSignUpMenu = false;
        $scope.ShowSignInMenu = false;
        $scope.GmailSigninFormShow = false;
        $scope.GmailSignupFormShow = true;
    };

    //GmailSignUplinkClick
    $scope.GmailSignUplinkClick = function () {
        $scope.ShowSignUpMenu = true;
        $scope.ShowSignInMenu = false;
        $scope.GmailSigninFormShow = false;
        $scope.GmailSignupFormShow = false;
    };

    $scope.BacktoLoginmenu = function () {
        $scope.ShowSignInMenu = true;
        $scope.ShowSignUpMenu = false;
        $scope.GmailSigninFormShow = false;
    };

    //Backtosignupmenu
    $scope.Backtosignupmenu = function () {
        $scope.ShowSignInMenu = false;
        $scope.ShowSignUpMenu = true;
        $scope.GmailSignupFormShow = false;
    };

    //Delcare ViewModel Class
    $scope.LoginModel = {};

    $scope.NewUserReg = {};

    //Retrieve Login Data
    $scope.ReturningCustomer = function (Landing) {


        //Assign values to LoginModel 
        $scope.LoginModel.EmailId = $scope.Landing.EmailId;
        $scope.LoginModel.Password = $scope.Landing.Password;
        $scope.LoginModel.FormType = 'ExistingCustomer';
        LoginData($scope.LoginModel);
    };


    //SignUpData
    $scope.NewCustomerSignUp = function (SignUp) {
        //Assign values to LoginModel 

        $scope.NewUserReg.UserName = $scope.SignUp.Username;
        $scope.NewUserReg.Mobile = $scope.SignUp.Mobile;
        $scope.NewUserReg.EmailId = $scope.SignUp.EmailId;
        $scope.NewUserReg.Password = $scope.SignUp.Password;
        $scope.NewUserReg.FormType = 'NewCustomer';
        SignUpData($scope.NewUserReg);
    };

    var LoginData = function (Form) {

        if (Form.FormType == 'ExistingCustomer') {
            URL = '/AllProducts/LoginUser';
        }
        else {
            URL = '/AllProducts/NewSignUpData';
        }
        var FormData = transformCombineModel(Form);

        $http({
            method: "POST",
            url: '/AllProducts/LoginUser',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {

            if (data.length > 0) {
                CheckingUserSessionInformation(FormData);
            }
            else {
                $scope.LoginErrImg = true;
                $scope.LoginFailed = 'Invalid User Credentials';
            }
        });
    }

    var SignUpData = function (Form) {

        var FormData = transformCombineModel(Form);

        $http({
            method: "POST",
            url: '/AllProducts/NewSignUpData',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        }).success(function (data) {

            if (data == 0) {
                $scope.AlreadyUserAvaiMsg = 'You are already registered user';
                $scope.LoginErrImg = true;
            }
            else {
                //CheckingUserSessionInformation(FormData);
                $scope.AlreadyUserAvaiMsg = LogOutUser();

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

    function CheckingUserSessionInformation(FormData) {

        $http({
            method: "POST",
            url: 'TrackOrder/LoginSession',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData
        })
               .success(function (data) {
                   if (data == 1) {
                       $scope.LoginErrImg = false;
                       $window.location.href = "http://localhost:62969/#/";
                       $rootScope.$broadcast("Update", $scope.LoginModel.EamilId);
                   }
                   else {
                       alert('Sorry, Not move To home Page');
                       $window.location.href = "http://localhost:62969/#/Home/Login/";

                   }
               });
    };

    //logout session data
    function LogOutUser() {
        var signup = '';
        $http.post('TrackOrder/LogoutUserSession', {})
            .success(function (data) {
                if (data == 0 || data == null || data == "") {
                    location.href = "http://localhost:62969/#/Home/Login";
                    location.reload();
                }
                else {
                    return signup = 'Sorry, there is a problem in creating new account';
                }
            });
    };

});

//UpdateProfileCtrl
app.controller('UpdateProfileCtrl', function ($scope, $http, $location) {

    //Show hide menus in layout page
    $scope.$parent.MenuOne = true;
    $scope.$parent.MenuTwo = false;
    //Dynamic menu gap
    $scope.$parent.DynamicMenuGap = 'MenuOneGap';

    $scope.Profile =
        {
            EditEmail: '',
            EditMobile: '',
            EditUserName: '',
            Password: ''
        }
    //show hide div contents
    $scope.ShowHide = {
        EditUserInfo: true,
        EditUserAddress: false,
        EditUserPassword: false,
        EditUserWallet: false,
        EditUserInfoSuccess: false,
        EditUserAddressSuccess: false,
        EditUserPasswordSuccess: false,
        EditUserWalletSuccess: false
    }

    //Checking Login Session Data
    CheckLoginSession();
    function CheckLoginSession() {

        $http.post('TrackOrder/RetrieveLoginSessionData', {})
            .success(function (data, config) {

                if (data == 0 || data == null || data == "") {
                    location.href = "http://localhost:62969/#/Home/Login";
                }
                else {
                    $scope.EditProfile.EmailId = data.EmailId;
                    $scope.EditProfile.Mobile = data.Mobile;
                    $scope.EditProfile.UserName = data.UserName;
                    $scope.EditProfile.Password = data.Password;
                    var FormData = transformCombineModel($scope.EditProfile);
                    $http({
                        method: "POST",
                        url: '/AllProducts/LoginUser',
                        headers: { "Content-Type": undefined },
                        transformRequest: window.angular.identity,
                        data: FormData
                    }).success(function (data) {

                        $scope.Profile.EditEmail = data[0].EmailId;

                        $scope.Profile.EditMobile = data[0].Mobile;
                        $scope.Profile.EditUserName = data[0].UserName;
                        $scope.Profile.Password = data[0].Password;

                        $scope.LoginEmailId = data[0].EmailId;
                        $scope.LoginMobileNumber = data[0].Mobile;
                        //location.href = "http://Localhost:62969/#/Shop/MyOrders/";
                    });
                }
            });
    };

    //Model Class
    $scope.EditProfile = {};
    //ShowUpdateMenuContent
    //$scope.ShowUpdateMenuContent = 'EditUSerInfo';

    //Show Hide Div function ClickUpdateMenus
    $scope.ClickUpdateMenus = function (checkeddiv) {
        if (checkeddiv == 'EditUSerInfo') {
            CheckLoginSession();
            ShowHideProfile();
        }
        if (checkeddiv == 'AddAddress') {
            ShowHideAddress();
        }
        if (checkeddiv == 'ChangePassword') {
            ShowHidePassword();
        }
        if (checkeddiv == 'Wallet') {
            ShowHideWallet();
        }
        // $scope.ShowUpdateMenuContent = checkeddiv;
    }

    //ShowHiding  Profile functions
    function ShowHideProfile() {
        $scope.ShowHide.EditUserInfo = true;
        $scope.ShowHide.EditUserAddress = false;
        $scope.ShowHide.EditUserPassword = false;
        $scope.ShowHide.EditUserWallet = false;
        $scope.ShowHide.EditUserInfoSuccess = false;
        $scope.ShowHide.EditUserAddressSuccess = false;
        $scope.ShowHide.EditUserPasswordSuccess = false;
        $scope.ShowHide.EditUserWalletSuccess = false;
    }


    //ShowHiding  Address functions
    function ShowHideAddress() {
        $scope.ShowHide.EditUserInfo = false;
        $scope.ShowHide.EditUserAddress = true;
        $scope.ShowHide.EditUserPassword = false;
        $scope.ShowHide.EditUserWallet = false;
        $scope.ShowHide.EditUserInfoSuccess = false;
        $scope.ShowHide.EditUserAddressSuccess = false;
        $scope.ShowHide.EditUserPasswordSuccess = false;
        $scope.ShowHide.EditUserWalletSuccess = false;
    }

    //ShowHiding  ChangePassword functions
    function ShowHidePassword() {
        $scope.ShowHide.EditUserInfo = false;
        $scope.ShowHide.EditUserAddress = false;
        $scope.ShowHide.EditUserPassword = true;
        $scope.ShowHide.EditUserWallet = false;
        $scope.ShowHide.EditUserInfoSuccess = false;
        $scope.ShowHide.EditUserAddressSuccess = false;
        $scope.ShowHide.EditUserPasswordSuccess = false;
        $scope.ShowHide.EditUserWalletSuccess = false;
    }

    //ShowHiding  Wallet functions
    function ShowHideWallet() {
        $scope.ShowHide.EditUserInfo = false;
        $scope.ShowHide.EditUserAddress = false;
        $scope.ShowHide.EditUserPassword = false;
        $scope.ShowHide.EditUserWallet = true;
        $scope.ShowHide.EditUserInfoSuccess = false;
        $scope.ShowHide.EditUserAddressSuccess = false;
        $scope.ShowHide.EditUserPasswordSuccess = false;
        $scope.ShowHide.EditUserWalletSuccess = false;
    }



    //Edit Profile 
    $scope.EditProfileInfo = function (Profile) {

        //Retreving and send data
        $scope.EditProfile.EmailId = $scope.Profile.EditEmail;
        $scope.EditProfile.Mobile = $scope.Profile.EditMobile;
        $scope.EditProfile.UserName = $scope.Profile.EditUserName;
        $scope.EditProfile.Password = $scope.Profile.Password;

        var FormData = transformCombineModel($scope.EditProfile);
        $http({
            method: "POST",
            url: 'AllProducts/UpdateUserProfileData',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData

        }).success(function (data) {
            if (data == 1) {
                $http({
                    method: "POST",
                    url: 'TrackOrder/LoginSession',
                    headers: { "Content-Type": undefined },
                    transformRequest: window.angular.identity,
                    data: FormData

                }).success(function (data) {
                    $scope.ShowHide.EditUserInfo = false;
                    $scope.ShowHide.EditUserInfoSuccess = true;
                });
            }
            else {
                $scope.ShowHide.EditUserInfoSuccess = false;
                $scope.ShowHide.EditUserInfo = true;
            }
        });
    }

    //Edit Password Info
    $scope.EditPasswordInfo = function (ChangePW) {
        //Retreving and send data
        $scope.EditProfile.EmailId = $scope.Profile.EditEmail;
        $scope.EditProfile.Mobile = $scope.Profile.EditMobile;
        $scope.EditProfile.UserName = $scope.Profile.EditUserName;
        $scope.EditProfile.Password = $scope.ChangePW.NewPassword;

        var FormData = transformCombineModel($scope.EditProfile);
        $http({
            method: "POST",
            url: 'AllProducts/UpdateUserProfileData',
            headers: { "Content-Type": undefined },
            transformRequest: window.angular.identity,
            data: FormData

        }).success(function (data) {
            if (data == 1) {

                $http({
                    method: "POST",
                    url: 'TrackOrder/LoginSession',
                    headers: { "Content-Type": undefined },
                    transformRequest: window.angular.identity,
                    data: FormData

                }).success(function (data) {
                    $scope.ShowHide.EditUserPassword = false;
                    $scope.ShowHide.EditUserPasswordSuccess = true;
                    $scope.ChangePW.NewPassword = '';
                    $scope.ChangePW.CopyNewPassword = '';
                });
            }
            else {
                $scope.ShowHide.EditUserPasswordSuccess = false;
                $scope.ShowHide.EditUserPassword = true;
            }
        });
    }
    //transforming data into form data
    var transformCombineModel = function (data) {

        var dataAsFormData = new FormData();
        window.angular.forEach(data, function (value, key) {
            dataAsFormData.append(key, value);
        });
        return dataAsFormData;
    }


    //AddingAddressProfileInfo
    $scope.AddingAddressProfileInfo = function (Address) {

    }

});

//Filter
app.filter('bygenre', function () {
    return function (DashboardClothDetails, genres) {

        if (!angular.isUndefined(products)) {
            var items = {
                genres: genres,
                out: []
            };
            angular.forEach(DashboardClothDetails, function (value, key) {

                if (this.genres[value.Size] === true) {
                    this.out.push(value);
                }
            }, items);
            return items.out;
        }
        else {
            return DashboardClothDetails;
        }
    };
});

//Calculating Total Amount
app.filter('total', function () {
    return function (input, property) {
        var i = input instanceof Array ? input.length : 0;
        if (typeof property === 'undefined' || i === 0) {
            return i;
        } else if (isNaN(input[0][property])) {
            throw 'filter total can count only numeric values';
        } else {
            var total = 0;
            while (i--)
                total += input[i][property];
            return total;
        }
    };
});

app.filter('DateTimeFormate', function () {

    return function (input) {
        var TotalDate = '';
        var m = input.split('/')[0];
        var d = input.split('/')[1];
        var y = input.split('/')[2];
        return TotalDate = d + "/" + m + "/" + y;
    };
})

//Use  Scrolling to Show Hide Second Row 

app.directive("scroll", function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset >= 100) {
                scope.boolChangeClass = true;
                scope.head1Hide = true;

            } else {
                scope.boolChangeClass = false;
                scope.head1Hide = false;
            }
            scope.$apply();
        });
    };
});


//Create Login Directive
app.directive('LoginDir', function ($compile, $http) {
    return {
        template: '<div class="col-md-6">Welcome Guest</div>'
    }

});
