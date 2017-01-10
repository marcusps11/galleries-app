app.factory('artService', artService);

artService.$inject = ['$q', '$http'];

function artService($q, $http) {
    return {
        getArtFromGoogleSpreadSheet() {
            var defer = $q.defer;

            $http({
                method: 'GET',
                url: 
            }).succer
        }
        
    }
}