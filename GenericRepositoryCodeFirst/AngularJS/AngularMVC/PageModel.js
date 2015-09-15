
var app = angular.module('Page', []);
app.controller('SliderCtrl', function ($scope) {
    
    $scope.Slides = [
    { image: '../Images/1.jpg', description: '1' },
    { image: '../Images/2.jpg', description: '2' },
    { image: '../Images/3.jpg', description: '3' },
    { image: '../Images/4.jpg', description: '4' },
    { image: '../Images/5.jpg', description: '5' },
    { image: '../Images/6.jpg', description: '6' }
    ];

    //Initial current index
    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
         
        $scope.currentIndex = index;

    };

    $scope.isCurrentSlideIndex = function (index) {
         
        return $scope.currentIndex === index;
    };

    //Previous Slide
    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.Slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.Slides.length - 1;
    };
});