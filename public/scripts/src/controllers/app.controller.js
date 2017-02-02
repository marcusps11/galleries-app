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

