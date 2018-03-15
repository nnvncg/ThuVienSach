/// <reference path="../scripts/angular.min.js" />
var app = angular.module("myApp", ['Controller', 'filterScripts', 'ngFileUpload', 'ckeditor', 'ngSanitize'])

//app.directive('ngEnter', function () {
//    return function (scope, element, attrs) {
//        element.bind("keydown keypress", function (event) {
//            if (event.which === 13) {
//                scope.$apply(function () {
//                    scope.$eval(attrs.ngEnter);
//                });

//                event.preventDefault();
//            }
//        });
//    };
//});

