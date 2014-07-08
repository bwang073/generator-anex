'use strict';

/* App Module */
angular.module('myportal', [ 'ngRoute', 'ngSanitize', 'ngAnimate', 'ngCookies', 'daoService' ]).config([ '$routeProvider', '$locationProvider', '$httpProvider', '$provide', function($routeProvider, $locationProvider, $httpProvider, $provide) {

	$routeProvider.when('/', {
		templateUrl : 'partials/home',
		controller : 'HomeController'
	}).when('/login', {
		templateUrl : 'partials/login',
		controller : 'LoginController'
	}).when('/list', {
		templateUrl : 'partials/list',
		controller : 'ListController'
	}).otherwise({
		redirectTo : '/'
	});

	// $locationProvider.html5Mode(true);

	// Global http error handler.
	$provide.factory('httpInterceptor', [ '$q', '$location', function($q, $location) {
		return {
			'responseError' : function(rejection) {
				if (rejection.status == 401) {
					var backto = $location.path();
					$location.path('/login');
					if (backto != '/' && backto != '/login') {
						$location.search('backto', backto);
					}
				} else {
					console.log(rejection.data);
				}
				return $q.reject(rejection);
			}
		};
	} ]);

	$httpProvider.interceptors.push('httpInterceptor');

} ]);