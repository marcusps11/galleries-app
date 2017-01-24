app.controller('appController', appController);

appController.$inject = ['$scope', 'artService', 'NgMap'];

    function appController($scope, artService, NgMap) {
        $scope.message = 'hello';

        function init() {
            artService.getArtFromGoogleSpreadSheet().then(onGalleriesLoad);
            getGoogleMap();
        }

        function onGalleriesLoad(galleries) {
            $scope.galleries = galleries;
    
        }

        function getGoogleMap() {
             NgMap.getMap().then(function (map) {
                 console.log(map)
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
        }
        init();
    }

