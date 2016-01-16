"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createInterface;

var _retryTest = require("./retryTest");

var _retryTest2 = _interopRequireDefault(_retryTest);

var _retrySuite = require("./retrySuite");

var _retrySuite2 = _interopRequireDefault(_retrySuite);

var _utils = require("./utils");

var _escapeStringRegexp = require("escape-string-regexp");

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInterface() {

	return function (suite) {
		var suites = [suite];
		suite.on("pre-require", function (context, file, mocha) {
			context.before = function () {
				return _retrySuite2.default.prototype.beforeAllWithRetry.bind(suites[0]).apply(undefined, arguments);
			};
			context.after = function () {
				return _retrySuite2.default.prototype.afterAllWithRetry.bind(suites[0]).apply(undefined, arguments);
			};
			context.beforeEach = function () {
				return _retrySuite2.default.prototype.beforeEachWithRetry.bind(suites[0]).apply(undefined, arguments);
			};
			context.afterEach = function () {
				return _retrySuite2.default.prototype.afterEachWithRetry.bind(suites[0]).apply(undefined, arguments);
			};
			context.describe = context.context = function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var _normalize = _utils.normalize.apply(undefined, [suites[0].times].concat(args));

				var times = _normalize.times;
				var title = _normalize.title;
				var fn = _normalize.fn;

				var asuite = _retrySuite2.default.create(suites[0], title);
				asuite.times = times || ~ ~process.env.MOCHA_RETRY;
				asuite.file = file;
				suites.unshift(asuite);
				fn.call(asuite);
				suites.shift();
				return asuite;
			};
			context.xdescribe = context.xcontext = context.describe.skip = function () {
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				var _normalize2 = _utils.normalize.apply(undefined, [0].concat(args));

				var title = _normalize2.title;
				var fn = _normalize2.fn;

				var asuite = _retrySuite2.default.create(suites[0], title);
				asuite.pending = true;
				suites.unshift(asuite);
				fn.call(asuite);
				return suites.shift();
			};
			context.describe.only = function () {
				var asuite = context.describe.apply(context, arguments);
				mocha.grep(asuite.fullTitle());
				return asuite;
			};
			context.it = context.itretry = function () {
				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				var asuite = suites[0];

				var _normalize3 = _utils.normalize.apply(undefined, [asuite.times || 1].concat(args));

				var times = _normalize3.times;
				var title = _normalize3.title;
				var fn = _normalize3.fn;

				var test = new _retryTest2.default(times, title, asuite.pending ? null : fn);
				test.file = file;
				test.suite = asuite;
				asuite.addTest(test);
				return test;
			};
			context.it.only = function () {
				for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					args[_key4] = arguments[_key4];
				}

				var asuite = suites[0];

				var _normalize4 = _utils.normalize.apply(undefined, [asuite.times || 1].concat(args));

				var times = _normalize4.times;
				var title = _normalize4.title;
				var fn = _normalize4.fn;

				var test = context.it(process.env.MOCHA_IT_ONLY_ONCE === "true" ? 1 : times, title, fn);
				var reString = "^" + (0, _escapeStringRegexp2.default)(test.fullTitle()) + "$";
				mocha.grep(new RegExp(reString));
				return test;
			};
			context.xit = context.xspecify = context.it.skip = function () {
				for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
					args[_key5] = arguments[_key5];
				}

				var _normalize5 = _utils.normalize.apply(undefined, [0].concat(args));

				var title = _normalize5.title;

				return context.it(1, title);
			};
		});
	};
}
//# sourceMappingURL=bddRetryInterface.js.map