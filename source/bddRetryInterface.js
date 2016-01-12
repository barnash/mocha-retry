"use strict";

import {utils, Suite} from "mocha";
import RetryTest from "./retryTest";


module.exports = function createInterface() {

	return (suite) => {
		const suites = [suite];
		suite.on("pre-require", (context, file, mocha) => {
			context.before = (...args) => suites[0].beforeAllWithRetry(...args);
			context.after = (...args) => suites[0].afterAllWithRetry(...args);
			context.beforeEach = (...args) => suites[0].beforeEachWithRetry(...args);
			context.afterEach = (...args) => suites[0].afterEachWithRetry(...args);
			context.describe = context.context = (times, title, fn) => {
				if (!fn) {
					[times, title, fn] = [void 0, times, title];
				}
				times = times || suites[0].times || ~~process.env.MOCHA_RETRY;
				const asuite = Suite.create(suites[0], title);
				asuite.times = times;
				asuite.file = file;
				suites.unshift(asuite);
				fn.call(asuite);
				suites.shift();
				return asuite;
			};
			context.xdescribe = context.xcontext = context.describe.skip = (times, title, fn) => {
				if (!fn) {
					[times, title, fn] = [void 0, times, title];
				}
				const asuite = Suite.create(suites[0], title);
				asuite.pending = true;
				suites.unshift(asuite);
				fn.call(asuite);
				return suites.shift();
			};
			context.describe.only = (times, title, fn) => {
				const asuite = context.describe(times, title, fn);
				mocha.grep(asuite.fullTitle());
				return asuite;
			};
			context.it = context.itretry = (times, title, fn) => {
				const asuite = suites[0];
				if (!fn && typeof times !== "number") {
					[times, title, fn] = [asuite.times || 1, times, title];
				}
				if (asuite.pending) {
					fn = null;
				}
				const test = new RetryTest(times, title, fn);
				test.file = file;
				asuite.addTest(test);
				return test;
			};
			context.it.only = (times, title, fn) => {
				const test = context.it(times, title, fn);
				const reString = "^" + utils.escapeRegexp(test.fullTitle()) + "$";
				mocha.grep(new RegExp(reString));
				return test;
			};
			context.xit = context.xspecify = context.it.skip = (times, title, fn) => {
				if (!title) {
					return context.it(times);
				}
				if (!fn) {
					[times, title, fn] = [1, times, title];
				}
				return context.it(times, title);
			};
		});
	};
};
