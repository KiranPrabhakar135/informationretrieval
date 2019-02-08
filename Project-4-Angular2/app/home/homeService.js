angular.module("myApp.home").service('homeService', function () {
    this.getTweetsFromSolr = function (url) {
        $http.get(url).then(function (response) {
            return response;
        });
    };
});