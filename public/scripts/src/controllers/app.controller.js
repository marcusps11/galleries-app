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
    }

