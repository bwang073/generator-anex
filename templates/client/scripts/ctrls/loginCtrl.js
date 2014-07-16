'use strict';

angular.module('myportal').controller('LoginController', [ '$scope', '$location', 'dao', function($scope, $location, dao) {
	$scope.login = function() {
		delete $scope.err;
		dao.login($scope.account).success(function() {
			var backto = $location.search().backto;
			$location.search('backto', null);
			if (backto) {
				$location.path(backto);
			} else {
				$location.path('/');
			}
		}).error(function(data) {
			$scope.err = data.message;
		});
	};
} ]);