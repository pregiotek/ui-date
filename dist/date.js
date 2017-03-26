(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("angular"), require("jquery-ui/datepicker"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "angular", "jquery-ui/datepicker"], factory);
	else if(typeof exports === 'object')
		exports["angularUiDate"] = factory(require("jquery"), require("angular"), require("jquery-ui/datepicker"));
	else
		root["angularUiDate"] = factory(root["jQuery"], root["angular"], root["jquery-ui/datepicker"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _angular = __webpack_require__(2);

	var _angular2 = _interopRequireDefault(_angular);

	var _datepicker = __webpack_require__(3);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// sets up jQuery with the datepicker plugin
	__webpack_require__(4);

	exports.default = _angular2.default.module('ui.date', []).constant('uiDateConfig', {}).constant('uiDateFormatConfig', '').factory('uiDateConverter', ['uiDateFormatConfig', function (uiDateFormatConfig) {
	  return {
	    stringToDate: stringToDate,
	    dateToString: dateToString
	  };

	  function dateToString(uiDateFormat, value) {
	    var dateFormat = uiDateFormat || uiDateFormatConfig;
	    if (value) {
	      if (dateFormat) {
	        try {
	          return _jquery2.default.datepicker.formatDate(dateFormat, value);
	        } catch (formatException) {
	          return undefined;
	        }
	      }

	      if (value.toISOString) {
	        return value.toISOString();
	      }
	    }
	    return null;
	  }

	  function stringToDate(dateFormat, valueToParse) {
	    dateFormat = dateFormat || uiDateFormatConfig;

	    if (_angular2.default.isDate(valueToParse) && !isNaN(valueToParse)) {
	      return valueToParse;
	    }

	    if (_angular2.default.isString(valueToParse)) {
	      if (dateFormat) {
	        return _jquery2.default.datepicker.parseDate(dateFormat, valueToParse);
	      }

	      var isoDate = new Date(valueToParse);
	      return isNaN(isoDate.getTime()) ? null : isoDate;
	    }

	    if (_angular2.default.isNumber(valueToParse)) {
	      // presumably timestamp to date object
	      return new Date(valueToParse);
	    }

	    return null;
	  }
	}]).directive('uiDate', ['uiDateConfig', 'uiDateConverter', function uiDateDirective(uiDateConfig, uiDateConverter) {

	  return {
	    require: '?ngModel',
	    scope: {
	      'uiDateLang': '=?',
	      'uiDate': '='
	    },
	    link: function link(scope, element, attrs, controller) {

	      var $element = (0, _jquery2.default)(element);

	      var getOptions = function getOptions() {
	        return _angular2.default.extend({}, uiDateConfig, scope.uiDate);
	      };
	      var initDateWidget = function initDateWidget() {
	        var showing = false;
	        var opts = getOptions();

	        function setVal(forcedUpdate) {
	          var keys = ['Hours', 'Minutes', 'Seconds', 'Milliseconds'];
	          var isDate = _angular2.default.isDate(controller.$modelValue);
	          var preserve = {};

	          if (!forcedUpdate && isDate && controller.$modelValue.toDateString() === $element.datepicker('getDate').toDateString()) {
	            return;
	          }

	          if (isDate) {
	            _angular2.default.forEach(keys, function (key) {
	              preserve[key] = controller.$modelValue['get' + key]();
	            });
	          }

	          var newViewValue = $element.datepicker('getDate');

	          if (isDate) {
	            _angular2.default.forEach(keys, function (key) {
	              newViewValue['set' + key](preserve[key]);
	            });
	          }

	          controller.$setViewValue(newViewValue);
	        }

	        // If we have a controller (i.e. ngModelController) then wire it up
	        if (controller) {
	          // Set the view value in a $apply block when users selects
	          // (calling directive user's function too if provided)
	          var _onSelect = opts.onSelect || _angular2.default.noop;
	          opts.onSelect = function (value, picker) {
	            scope.$apply(function () {
	              showing = true;
	              setVal();
	              $element.blur();
	              _onSelect(value, picker, $element);
	            });
	          };

	          var _beforeShow = opts.beforeShow || _angular2.default.noop;
	          opts.beforeShow = function (input, picker) {
	            showing = true;
	            _beforeShow(input, picker, $element);
	          };

	          var _onClose = opts.onClose || _angular2.default.noop;
	          opts.onClose = function (value, picker) {
	            showing = false;
	            _onClose(value, picker, $element);
	          };

	          element.on('focus', function (focusEvent) {
	            if (attrs.readonly) {
	              focusEvent.stopImmediatePropagation();
	            }
	          });

	          $element.off('blur.datepicker').on('blur.datepicker', function () {
	            if (!showing) {
	              scope.$apply(function () {
	                $element.datepicker('setDate', $element.datepicker('getDate'));
	                setVal();
	              });
	            }
	          });

	          controller.$validators.uiDateValidator = function uiDateValidator(modelValue, viewValue) {
	            return viewValue === null || viewValue === '' || _angular2.default.isDate(uiDateConverter.stringToDate(attrs.uiDateFormat, viewValue));
	          };

	          controller.$parsers.push(function uiDateParser(valueToParse) {
	            return uiDateConverter.stringToDate(attrs.uiDateFormat, valueToParse);
	          });

	          // Update the date picker when the model changes
	          controller.$render = function () {
	            // Force a render to override whatever is in the input text box
	            if (_angular2.default.isDate(controller.$modelValue) === false && _angular2.default.isString(controller.$modelValue)) {
	              controller.$modelValue = uiDateConverter.stringToDate(attrs.uiDateFormat, controller.$modelValue);
	            }
	            $element.datepicker('setDate', controller.$modelValue);
	          };
	        }
	        // Check if the $element already has a datepicker.
	        //

	        if ($element.data('datepicker')) {
	          // Updates the datepicker options
	          $element.datepicker('option', opts);
	          $element.datepicker('refresh');
	        } else {
	          // Creates the new datepicker widget
	          $element.datepicker(opts);

	          // Cleanup on destroy, prevent memory leaking
	          $element.on('$destroy', function () {
	            $element.datepicker('hide');
	            $element.datepicker('destroy');
	          });
	        }

	        if (controller) {
	          controller.$render();
	          // Update the model with the value from the datepicker after parsed
	          setVal(true);
	        }
	      };

	      // Watch for changes to the directives options
	      scope.$watch(getOptions, initDateWidget, true);

	      //Add language support
	      scope.$watch(getLang, updateLanguage, true);

	      function getLang() {
	        return scope.uiDateLang;
	      }

	      //Update the datepicker language if lang attribute specified
	      function updateLanguage() {
	        if (scope.uiDateLang) {
	          var lang = scope.uiDateLang;
	          (0, _jquery2.default)($element).datepicker('option', _jquery2.default.datepicker.regional[lang]);
	        }
	      }
	    }
	  };
	}]).directive('uiDateFormat', ['uiDateConverter', function (uiDateConverter) {
	  return {
	    require: 'ngModel',
	    link: function link(scope, element, attrs, modelCtrl) {
	      var dateFormat = attrs.uiDateFormat;

	      // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
	      modelCtrl.$formatters.unshift(function (value) {
	        return uiDateConverter.stringToDate(dateFormat, value);
	      });

	      modelCtrl.$parsers.push(function (value) {
	        return uiDateConverter.dateToString(dateFormat, value);
	      });
	    }
	  };
	}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* French initialisation for the jQuery UI date picker plugin. */
	/* Written by Keith Wood (kbwood{at}iinet.com.au),
				  Stéphane Nahmani (sholby@sholby.net),
				  Stéphane Raimbault <stephane.raimbault@gmail.com> */
	(function (datepicker) {

	    datepicker.regional.fr = {
	        closeText: 'Fermer',
	        prevText: 'Précédent',
	        nextText: 'Suivant',
	        currentText: 'Aujourd\'hui',
	        monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
	        monthNamesShort: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
	        dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
	        dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
	        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
	        weekHeader: 'Sem.',
	        dateFormat: 'dd/mm/yy',
	        firstDay: 1,
	        isRTL: false,
	        showMonthAfterYear: false,
	        yearSuffix: ''
	    };
	    //datepicker.setDefaults( datepicker.regional.fr );

	    return datepicker.regional.fr;
	})(_jquery2.default.datepicker);

	/* Dutch (Belgium) initialisation for the jQuery UI date picker plugin. */
	/* David De Sloovere @DavidDeSloovere */
	(function (datepicker) {

	    datepicker.regional.nl = {
	        closeText: 'Sluiten',
	        prevText: '←',
	        nextText: '→',
	        currentText: 'Vandaag',
	        monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
	        monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
	        dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
	        dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
	        dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
	        weekHeader: 'Wk',
	        dateFormat: 'dd/mm/yy',
	        firstDay: 1,
	        isRTL: false,
	        showMonthAfterYear: false,
	        yearSuffix: ''
	    };
	    //datepicker.setDefaults( datepicker.regional.nl );

	    return datepicker.regional.nl;
	})(_jquery2.default.datepicker);

	/* English/UK initialisation for the jQuery UI date picker plugin. */
	/* Written by Stuart. */
	(function (datepicker) {

	    datepicker.regional.en = {
	        closeText: 'Done',
	        prevText: 'Prev',
	        nextText: 'Next',
	        currentText: 'Today',
	        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	        weekHeader: 'Wk',
	        dateFormat: 'dd/mm/yy',
	        firstDay: 1,
	        isRTL: false,
	        showMonthAfterYear: false,
	        yearSuffix: '' };
	    //datepicker.setDefaults( datepicker.regional.en );

	    return datepicker.regional.en;
	})(_jquery2.default.datepicker);

	(function (datepicker) {

	    datepicker.setLanguage = function (lang) {
	        datepicker.setDefaults(datepicker.regional[lang]);
	    };
	})(_jquery2.default.datepicker);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=date.js.map