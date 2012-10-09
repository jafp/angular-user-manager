'use strict';

angular.module('usermanager', ['usermanager.filters', 'usermanager.services', 'usermanager.directives']).

	/**
	 * Configure routing
	 */
	config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/users', {templateUrl: 'partials/users.html', controller: UsersCtrl});

	    $routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: SettingsCtrl});

	    $routeProvider.otherwise({redirectTo: '/users'});

	 }]);
