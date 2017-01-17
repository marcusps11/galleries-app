var app = angular.module('artApp', []);

app.controller('appController', appController);

appController.$inject = ['$scope', 'artService'];

    function appController($scope, artService) {
        $scope.message = 'hello';

        function init() {
            artService.getArtFromGoogleSpreadSheet().then(onGalleriesLoad)
        }

        function onGalleriesLoad(galleries) {
            $scope.galleries = galleries;
    
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
