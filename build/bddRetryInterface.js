'use strict';

(function () {
  var createInterface;

  module.exports = createInterface = function createInterface(Mocha) {
    var RetryTest, Suite, interfaces, patchMochaSuite, utils;
    RetryTest = require('./retryTest');
    interfaces = Mocha.interfaces;
    Suite = Mocha.Suite;
    utils = Mocha.utils;
    patchMochaSuite = require('./retrySuite');
    patchMochaSuite(Mocha);
    return interfaces.bddretry = function (suite) {
      var suites;
      suites = [suite];
      return suite.on("pre-require", function (context, file, mocha) {
        context.before = function (times, name, fn) {
          return suites[0].beforeAllWithRetry(times, name, fn);
        };
        context.after = function (times, name, fn) {
          return suites[0].afterAllWithRetry(times, name, fn);
        };
        context.beforeEach = function (times, name, fn) {
          return suites[0].beforeEachWithRetry(times, name, fn);
        };
        context.afterEach = function (times, name, fn) {
          return suites[0].afterEachWithRetry(times, name, fn);
        };
        context.describe = context.context = function (times, title, fn) {
          var asuite, ref;
          if (fn == null) {
            ref = [times, title], title = ref[0], fn = ref[1];
            times = void 0;
          }
          if (suites[0].times != null && times == null) {
            times = suites[0].times;
          }
          if (context.DEFAULT_RETRY != null && times == null) {
            times = context.DEFAULT_RETRY;
          }
          asuite = Suite.create(suites[0], title);
          asuite.times = times;
          asuite.file = file;
          suites.unshift(asuite);
          fn.call(asuite);
          suites.shift();
          return asuite;
        };
        context.xdescribe = context.xcontext = context.describe.skip = function (times, title, fn) {
          var asuite, ref;
          if (fn == null) {
            ref = [times, title], title = ref[0], fn = ref[1];
            times = void 0;
          }
          asuite = Suite.create(suites[0], title);
          asuite.pending = true;
          suites.unshift(asuite);
          fn.call(asuite);
          return suites.shift();
        };
        context.describe.only = function (times, title, fn) {
          var asuite;
          asuite = context.describe(times, title, fn);
          mocha.grep(asuite.fullTitle());
          return asuite;
        };
        context.it = context.itretry = function (times, title, fn) {
          var asuite, ref, test;
          asuite = suites[0];
          if (fn == null && typeof times !== 'number') {
            ref = [times, title], title = ref[0], fn = ref[1];
            times = asuite.times != null ? asuite.times : 1;
          }
          if (asuite.pending) {
            fn = null;
          }
          test = new RetryTest(times, title, fn);
          test.file = file;
          asuite.addTest(test);
          return test;
        };
        context.it.only = function (times, title, fn) {
          var reString, test;
          test = context.it(times, title, fn);
          reString = "^" + utils.escapeRegexp(test.fullTitle()) + "$";
          mocha.grep(new RegExp(reString));
          return test;
        };
        return context.xit = context.xspecify = context.it.skip = function (times, title, fn) {
          var ref;
          if (title == null) {
            return context.it(times);
          }
          if (fn == null) {
            ref = [1, times, title], times = ref[0], title = ref[1], fn = ref[2];
          }
          return context.it(times, title);
        };
      });
    };
  };
}).call(undefined);
//# sourceMappingURL=bddRetryInterface.js.map