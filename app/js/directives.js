'use strict';

/* Directives */


angular.module('usermanager.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('tabs', ['$rootScope', '$location', function($rootScope, $location) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
 
        $rootScope.$on('$routeChangeSuccess', function(event) {
          var path = '#' + $location.path();

          angular.forEach(panes, function(pane) {
            pane.selected = (pane.url === path) ? true : false;
          });
        });

        this.addPane = function(pane) {
          panes.push(pane);
        }
        
      },
      template:
        '<div class="tabbable" ng-transclude>' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected, brand:pane.brand}">'+
              '<a href="{{pane.url}}" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
        '</div>',
      replace: true
    };
  }]).

  directive('pane', ['$i18n', function($i18n) {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: {},
      link: function(scope, element, attrs, tabsCtrl) {
        var pane = { title: $i18n.t(attrs.title), url: attrs.url };
        tabsCtrl.addPane(pane);
      },
      replace: true
    };
  }]).

  directive('brand', function($i18n) {
  	return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: {},
      link: function(scope, element, attrs, tabsCtrl) {
      	var pane = { title: $i18n.t(attrs.title), url: attrs.url, brand: true };
        tabsCtrl.addPane(pane);
      },
      replace: true
    };
  }).

  directive('t', function($i18n) {
  	return {
  		link: function(scope, element, attrs) {
  			element.text($i18n.t(attrs.t));
  		}
  	};
  }).

  directive('roles', function($i18n) {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.roles, function(value) {
          var roleNames = [];

          _.each(value, function(role) {
            roleNames.push( $i18n.t('role.' + role.toLowerCase()) );
          });

          element.text(roleNames.sort().join(', '));
        });        
      }
    }
  });
