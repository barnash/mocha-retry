"use strict";

import RetryTest from "./retryTest";
import RetrySuite from "./retrySuite";
import {normalize} from "./utils";
import escapeStringRegexp from "escape-string-regexp";


export default function createInterface() {

	return (suite) => {
		const suites = [suite];
		suite.on("pre-require", (context, file, mocha) => {
			context.before = (...args) => RetrySuite.prototype.beforeAllWithRetry.bind(suites[0])(...args);
			context.after = (...args) => RetrySuite.prototype.afterAllWithRetry.bind(suites[0])(...args);
			context.beforeEach = (...args) => RetrySuite.prototype.beforeEachWithRetry.bind(suites[0])(...args);
			context.afterEach = (...args) => RetrySuite.prototype.afterEachWithRetry.bind(suites[0])(...args);
			context.describe = context.context = (...args) => {
				const {times, title, fn} = normalize(suites[0].times, ...args);
				const asuite = RetrySuite.create(suites[0], title);
				asuite.times = times || ~~process.env.MOCHA_RETRY;
				asuite.file = file;
				suites.unshift(asuite);
				fn.call(asuite);
				suites.shift();
				return asuite;
			};
			context.xdescribe = context.xcontext = context.describe.skip = (...args) => {
				const {title, fn} = normalize(0, ...args);
				const asuite = RetrySuite.create(suites[0], title);
				asuite.pending = true;
				suites.unshift(asuite);
				fn.call(asuite);
				return suites.shift();
			};
			context.describe.only = (...args) => {
				const asuite = context.describe(...args);
				mocha.grep(asuite.fullTitle());
				return asuite;
			};
			context.it = context.itretry = (...args) => {
				const asuite = suites[0];
				const {times, title, fn} = normalize(asuite.times || 1, ...args);
				const test = new RetryTest(times, title, asuite.pending ? null : fn);
				test.file = file;
				asuite.addTest(test);
				return test;
			};
			context.it.only = (...args) => {
				const asuite = suites[0];
				const {times, title, fn} = normalize(asuite.times || 1, ...args);
				const test = context.it(process.env.MOCHA_IT_ONLY_ONCE === "true" ? 1 : times, title, fn);
				const reString = "^" + escapeStringRegexp(test.fullTitle()) + "$";
				mocha.grep(new RegExp(reString));
				return test;
			};
			context.xit = context.xspecify = context.it.skip = (...args) => {
				const {title} = normalize(0, ...args);
				return context.it(1, title);
			};
		});
	};
}
