/**
 * @license Copyright (c) 2011 Cello Software, LLC.
 * All rights reserved.
 * Available via the new BSD License.
 */
/*jshint
	bitwise: false, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, maxlen: 100,
	newcap: true, noarg: true, noempty: true, onevar: true, passfail: false, strict: true,
	undef: true, white: true
*/
/*global define: false, require: false */

// configure requirejs
define([
	'./testTwine',
	'./testKernel',
	'./model/test'
],
function (Twine, Kernel, Model) {
	'use strict';
	return {
		'test Twine': Twine,
		'test Kernel': Kernel,
		'test Model': Model
	};
});
