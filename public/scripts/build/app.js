var app = angular.module('artApp', ['ngMap']);

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
