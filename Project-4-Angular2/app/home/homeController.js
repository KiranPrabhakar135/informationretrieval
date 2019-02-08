angular.module("myApp.home").controller('homeController', function get($scope, homeService, Constants) {
    this.getTweets = function (url){
        return homeService.getTweetsFromSolr(url);
    };
    this.getHashTags = function(response){
        let arrTags=[];
        let i;
        for(i=0;i<5;i++){
            let elem = response.data.response.docs[i];
            arrTags.push({"id":i, "text":elem.hashtags[0]});
        }
        return arrTags;
    };
    this.getDelhiHashTags = function(){
        let response = this.getTweets(Constants.baseUrl + Constants.hashTagsDelhi);
        return this.getHashTags(response);
    };
    $scope.delhiHashTags =this.getDelhiHashTags();
    this.getParisHashTags = function(){
        let response = this.getTweets(Constants.baseUrl + Constants.hashTagsParis);
        return this.getHashTags(response);
    };
    $scope.hashTagsParis =this.getParisHashTags();

    this.getBangkokHashTags = function(){
        let response = this.getTweets(Constants.baseUrl + Constants.hashTagsBangkok);
        return this.getHashTags(response);
    };
    $scope.hashTagsBangkok =this.getBangkokHashTags();

    this.getPoliticsHashTags = function(){
        let response = this.getTweets(Constants.baseUrl + Constants.hashTagsPolitics);
        return this.getHashTags(response);
    };
    $scope.hashTagsPolitics =this.getPoliticsHashTags();

    this.getEnvironmentHashTags = function(){
        let response = this.getTweets(Constants.baseUrl + Constants.hashTagsEnv);
        return this.getHashTags(response);
    };
    $scope.hashTagsEnv =this.getEnvironmentHashTags();
});