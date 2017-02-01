var app = angular.module('artApp', ['ngMap']);

app.controller('appController', appController);

appController.$inject = ['artService', 'NgMap'];

function appController(artService, NgMap) {
    let vm = this;
    vm.position = [];

    function init() {
        artService.getArtFromGoogleSpreadSheet().then(onGalleriesLoad);
        getGoogleMap();
        getLatLng(vm.galleries);
    }

    vm.showCity = function (event, city) {
        vm.selectedCity = city.name;
        vm.map.showInfoWindow('myInfoWindow', this);
    }

    function getGoogleMap() {
        NgMap.getMap().then(function (map) {
            vm.map = map;
        });
    }

    function onGalleriesLoad(galleries) {
        vm.galleries = galleries;
        getLatLng(galleries)
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



    // vm.showCity();


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
