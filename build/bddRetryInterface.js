"use strict";

var _mocha = require("mocha");

var _retryTest = require("./retryTest");

var _retryTest2 = _interopRequireDefault(_retryTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createInterface() {

    return function (suite) {
        var suites = [suite];
        suite.on("pre-require", function (context, file, mocha) {
            context.before = function () {
                var _suites$;

                return (_suites$ = suites[0]).beforeAllWithRetry.apply(_suites$, arguments);
            };
            context.after = function () {
                var _suites$2;

                return (_suites$2 = suites[0]).afterAllWithRetry.apply(_suites$2, arguments);
            };
            context.beforeEach = function () {
                var _suites$3;

                return (_suites$3 = suites[0]).beforeEachWithRetry.apply(_suites$3, arguments);
            };
            context.afterEach = function () {
                var _suites$4;

                return (_suites$4 = suites[0]).afterEachWithRetry.apply(_suites$4, arguments);
            };
            context.describe = context.context = function (times, title, fn) {
                if (!fn) {
                    var _ref = [void 0, times, title];
                    times = _ref[0];
                    title = _ref[1];
                    fn = _ref[2];
                }
                times = times || suites[0].times || context.DEFAULT_RETRY;
                var asuite = _mocha.Suite.create(suites[0], title);
                asuite.times = times;
                asuite.file = file;
                suites.unshift(asuite);
                fn.call(asuite);
                suites.shift();
                return asuite;
            };
            context.xdescribe = context.xcontext = context.describe.skip = function (times, title, fn) {
                if (!fn) {
                    var _ref2 = [void 0, times, title];
                    times = _ref2[0];
                    title = _ref2[1];
                    fn = _ref2[2];
                }
                var asuite = _mocha.Suite.create(suites[0], title);
                asuite.pending = true;
                suites.unshift(asuite);
                fn.call(asuite);
                return suites.shift();
            };
            context.describe.only = function (times, title, fn) {
                var asuite = context.describe(times, title, fn);
                mocha.grep(asuite.fullTitle());
                return asuite;
            };
            context.it = context.itretry = function (times, title, fn) {
                var asuite = suites[0];
                if (!fn && typeof times !== "number") {
                    var _ref3 = [asuite.times || 1, times, title];
                    times = _ref3[0];
                    title = _ref3[1];
                    fn = _ref3[2];
                }
                if (asuite.pending) {
                    fn = null;
                }
                var test = new _retryTest2.default(times, title, fn);
                test.file = file;
                asuite.addTest(test);
                return test;
            };
            context.it.only = function (times, title, fn) {
                var test = context.it(times, title, fn);
                var reString = "^" + _mocha.utils.escapeRegexp(test.fullTitle()) + "$";
                mocha.grep(new RegExp(reString));
                return test;
            };
            context.xit = context.xspecify = context.it.skip = function (times, title, fn) {
                if (!title) {
                    return context.it(times);
                }
                if (!fn) {
                    var _ref4 = [1, times, title];
                    times = _ref4[0];
                    title = _ref4[1];
                    fn = _ref4[2];
                }
                return context.it(times, title);
            };
        });
    };
};
//# sourceMappingURL=bddRetryInterface.js.map