var app = angular.module('artApp', ['ngMap']);

app.controller('appController', appController);

appController.$inject = ['$scope', 'artService', 'NgMap'];

function appController($scope, artService, NgMap) {
    let vm = this;
    vm.message = 'hello';
    vm.position = [];

    

    function init() {
        artService.getArtFromGoogleSpreadSheet().then(onGalleriesLoad);
        getGoogleMap();
        getLatLng();
    }

    function onGalleriesLoad(galleries) {
        vm.galleries = galleries;
        getLatLng(galleries)


    }

    function getGoogleMap() {
        NgMap.getMap().then(function (map) {

        });
    }

    function getLatLng(galleries) {
        if (galleries) {
            galleries.forEach((gallery) => {
                let obj = {}
                obj["name"] = gallery.gallery;
                obj["lat"] = gallery.lat.split(',')[0]
                obj["lng"] = gallery.lat.split(',')[1]
                vm.position.push(obj)

        })
        }

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
