var app = angular.module('artApp', ['ngMap']);

app.controller('appController', appController);

appController.$inject = ['artService', 'NgMap'];

function appController(artService, NgMap) {
    let vm = this;

    NgMap.getMap().then(function (map) {
        vm.map = map;
        init();
        google.maps.event.trigger(map, 'resize');
    });

    vm.toggleViews() {
        
    }

    function init() {
        artService.getArtFromGoogleSpreadSheet().then(onGalleriesLoad);
    }

    function onGalleriesLoad(galleries) {
        getLatLng(galleries)
        vm.galleries = galleries;

    }

    function getLatLng(galleries) {
        if (galleries) {
            galleries.forEach((gallery) => {
                gallery["lat"] = gallery.lat.split(',')
                return gallery;
            })
        }
    }

    vm.showDetail = function (e, item) {
        vm.item = item;
        vm.map.showInfoWindow('foo-iw', this);
    };

    vm.hideDetail = function () {
        vm.map.hideInfoWindow('foo-iw');
    };
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
