'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('usermanager.services', []).
  value('version', '0.1')

  	/**
  	 * i18n service
  	 */
	.factory('$i18n', function($locale) {

		$.jsperanto.init(function(t) { }, { dictionary: window.translations['da-dk'] });

		return {
			t: function(key, params) {
				var options = { defaultValue: '_' + key + '_' };
				angular.extend(options, params || {});

				return $.jsperanto.translate(key, options);
			},
			lang: function(lang) {
				// TODO: Change language
			}
		}
	})

	/**
	 * Popup handling service
	 */
	.factory('$popup', function($http, $compile, $templateCache) {

		return {
			open: function(templateUrl, parentScope, options) {
				options = _.extend(options, { width: 500, modal: true });

				$http.get(templateUrl, {cache: $templateCache}).success(function(response) {
					var childScope = parentScope.$new(),
						element,
						dialog;

					dialog = {
						element: element,
						close: function() {
							element.dialog('close');
						}
					};

					childScope.dialog = dialog;
					element = $(response);

					$compile(element)(childScope);

					element.dialog(options);
				});
			}
		}
	});


