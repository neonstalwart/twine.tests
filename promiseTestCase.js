/**
 * Test case with promises, sandboxes all test functions
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @author Ben Hockey (neonstalwart@gmail.com)
 * @license BSD
 *
 * Copyright (c) 2010-2011 Christian Johansen
 */

/*jshint
	bitwise: false, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, maxlen: 100,
	newcap: true, noarg: true, noempty: true, onevar: true, passfail: false, strict: true,
	undef: true, white: true
*/
/*global define: false, require: false */

define(['sinon', 'promised-io/promise'], function (sinon, promise) {
	'use strict';

	function makeTest(test, setUp, tearDown) {
		return function () {
			var exception,
				context = this,
				args = arguments,
				setUpResult,
				result;

			function tDown() {
				tearDown.apply(context, args);
			}

			if (typeof setUp === 'function') {
				setUpResult = setUp.apply(context, args);
			}

			try {
				result = promise.when(setUpResult, function () {
					return test.apply(context, args);
				});
			}
			catch (e) {
				exception = e;
			}

			if (typeof tearDown === 'function') {
				promise.when(result, tDown, tDown);
			}

			if (exception) {
				throw exception;
			}

			return result;
		};
	}

	return function testCase(tests) {
		if (!tests || typeof tests !== "object") {
			throw new TypeError("promise test case needs an object with test functions");
		}

		var methods = {},
			rPrefix = /^test/,
			setUp = tests.setUp,
			tearDown = tests.tearDown;

		Object.keys(tests).forEach(function (testName) {
			var test = tests[testName];

			if (rPrefix.test(testName) && typeof test === 'function') {
				if (setUp || tearDown) {
					test = makeTest(test, setUp, tearDown);
				}
				methods[testName] = sinon.test(test);
			}
			else if (!/^(setUp|tearDown)$/.test(testName)) {
				methods[testName] = test;
			}
		});
		return methods;
	};

});
