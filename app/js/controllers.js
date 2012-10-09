'use strict';

/* Controllers */

function AppCtrl() {

}

function UsersCtrl($scope, $popup, $i18n) {

	$scope.selected = null;
	$scope.users = [{id: _.uniqueId(), firstname: "Jacob", lastname: "Pedersen", roles: [ "Admin", "User", "Manager" ]},{id: _.uniqueId(), firstname: "John", lastname: "Deere", roles: [ "Admin" ]}];

	/**
	 * View actions
	 */
	$scope.select = function(user) {
		angular.forEach($scope.users, function(user) {
			user.selected = false;
		});
		user.selected = true;
		$scope.selected = user;
	}

	$scope.new = function() {
		$scope.user = {};
		$popup.open('partials/popup.user.html', $scope, { title: $i18n.t('new_user') });
	}

	$scope.edit = function() {
		$scope.user = angular.copy($scope.selected);
		$popup.open('partials/popup.user.html', $scope, { title: $i18n.t('edit_user') });
	}

	$scope.delete = function() {
		$scope.users = _.without($scope.users, $scope.selected);
		$scope.selected = null;
	}

	$scope.view = function() {
		$scope.user = $scope.selected;
		$popup.open('partials/popup.user.view.html', $scope, { title: $i18n.t('view_user')});
	}
}

function UserPopupCtrl($scope, $i18n) {
	$scope.user = $scope.user || {};
	$scope.roles = [{ value: 'User', name: $i18n.t('role.user') }, { value: 'Admin', name: $i18n.t('role.admin') },
		{ value: 'Manager', name: $i18n.t('role.manager') }];

	_.each($scope.roles, function(role) {
		role.selected = _.contains($scope.user.roles, role.value);
	});

	$scope.cancel = function() {
		$scope.dialog.close();
	}

	$scope.ok = function() {
		$scope.dialog.close();
		if (_.isUndefined($scope.user.id)) {
			// It is a new user, add to end of list
			$scope.user.id = _.uniqueId();
			$scope.$parent.users.push($scope.user);
		} else {
			// Find the right user and update its properties
			_.each($scope.$parent.users, function(user) {
				if (user.id == $scope.user.id) {
					_.extend(user, $scope.user);
				}
			});
		}
	}
}

function SettingsCtrl($scope) {

}