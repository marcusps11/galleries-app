var app = angular.module('artApp', ['ngMap']);

app.controller('appController', appController);

appController.$inject = ['$scope', 'artService', 'NgMap'];

function appController($scope, artService, NgMap) {
    $scope.message = 'hello';
    $scope.position = [];

    function init() {
        artService.getArtFromGoogleSpreadSheet().then(onGalleriesLoad);
        getGoogleMap();
        getLatLng();
    }

    function onGalleriesLoad(galleries) {
        $scope.galleries = galleries;

    }

    function getGoogleMap() {
        NgMap.getMap().then(function (map) {

        });
    }

    function getLatLng() {
        var lat = 43.6600000;
        var lng = -79.4103000;

        $scope.position.push({
            lat: lat,
            lng: lng
        })
        console.log($scope.position)
    }
    init();
}




app.factory('artService', artService);

artService.$inject = ['$q', '$http'];

function artService($q, $http) {
    return {
        getArtFromGoogleSpreadSheet() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'assets/data/gallerydata.json'
            }).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }

    }
}
