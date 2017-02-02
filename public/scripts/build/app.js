var app = angular.module('artApp', ['ngMap']);

app.controller('appController', appController);

appController.$inject = ['artService', 'NgMap'];

function appController(artService, NgMap) {
    let vm = this;
    vm.position = [];

    NgMap.getMap().then(function (map) {
        vm.map = map;
        init();
    });

    function init() {
        artService.getArtFromGoogleSpreadSheet().then(onGalleriesLoad);
    }

    function onGalleriesLoad(galleries) {
        vm.galleries = galleries;
        getLatLng(galleries)
    }

    function getLatLng(galleries) {
        if (galleries) {
            galleries.forEach((gallery) => {
                console.log(gallery)
                let obj = {}
                obj["name"] = gallery.gallery;
                obj["title"] = gallery.title;
                obj["address"] = gallery.address;
                obj["lat"] = gallery.lat.split(',')[0]
                obj["lng"] = gallery.lat.split(',')[1]
                obj["date"] = gallery.date;
                obj["time"] = gallery.time;
                obj["link"] = gallery.link;
                vm.position.push(obj)
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
};

// function init() {
//     getGoogleMap();
//     getLatLng(vm.galleries);
// }

// vm.showCity = function (event, city) {
//     vm.selectedCity = city.name;
//     vm.map.showInfoWindow('myInfoWindow', this);
// }

// function getGoogleMap() {

// }







// vm.showCity();


//     init();
// }




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
