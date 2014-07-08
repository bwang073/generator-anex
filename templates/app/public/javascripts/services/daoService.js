'use strict';

/* Services */

var vipServices = angular.module('daoService', [ 'ngResource' ]);

vipServices.factory('dao', [ '$http', function($http) {
	return {
		login : function(data) {
			return $http.post('/login', data);
		},
		logout : function(data) {
			return $http.get('/logout', data);
		}
	};
} ]);
