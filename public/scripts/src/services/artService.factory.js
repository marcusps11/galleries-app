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
