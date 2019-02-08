
// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.home'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: 'home/home.html'});

}]);


// angular.module("home",['ngRoute']).constant("Constants",{
//     baseUrl: "http://ec2-18-222-178-253.us-east-2.compute.amazonaws.com:8004/solr/IRF18P1/select?",
//     hashTagsDelhi: "hashtags:[%22%22%20TO%20*]&fq=city:Delhi&fq=tweet_lang:en&fl=hashtags&wt=json&indent=true&rows=5",
//     hashTagsParis: "hashtags:[%22%22%20TO%20*]&fq=city:Paris&fq=tweet_lang:en&fl=hashtags&wt=json&indent=true&rows=5",
//     hashTagsBangkok: "hashtags:[%22%22%20TO%20*]&fq=city:Bangkok&fq=tweet_lang:en&fl=hashtags&wt=json&indent=true&rows=5",
//     hashTagsPolitics: "hashtags:[%22%22%20TO%20*]&fq=topic:Politics&fq=tweet_lang:en&fl=hashtags&wt=json&indent=true&rows=15",
//     hashTagsEnv:"hashtags:[%22%22%20TO%20*]&fq=topic:Environment&fq=tweet_lang:en&fl=hashtags&wt=json&indent=true&rows=25"
// }).config(['$routeProvider', function($routeProvider) {
//     $routeProvider.when('/home', {
//         templateUrl: 'home/home.html',
//         controller: 'homeController'
//     });
// }]);