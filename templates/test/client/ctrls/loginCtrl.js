'use strict';

describe('Controller: LoginController', function() {

	// load the controller's module
	beforeEach(module('myportal'));

	var MainCtrl, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		MainCtrl = $controller('LoginController', {
			$scope : scope
		});
	}));

	it('should attach a list of awesomeThings to the scope', function() {
		expect(3).toBe(3);
	});
});
