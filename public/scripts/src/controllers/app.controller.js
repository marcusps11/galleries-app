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

