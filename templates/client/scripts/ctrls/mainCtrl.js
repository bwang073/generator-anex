'use strict';

angular.module('myportal').controller('MainController', [ '$scope', '$location', 'dao', function($scope, $location, dao) {
	$scope.logout = function() {
		dao.logout().success(function() {
			$location.path('/login');
		});
	};
	$scope.isLogin = function() {
		return $location.path() === '/login';
	};
} ]);