"use strict";

import Q from "q";
import assert from "assert";

let times = 0;

describe("A non retry suite", () => {
	it("works with a normal, non retry test", () => {
	});
	it("works with a normal, async, non retry test", (done) => {
		done();
	});
});

describe("A suite with tests with retry", () => {
	it(2, "works with a retried test not async", () => {
		times++;
		if (times % 2 !== 0) {
			throw new Error("not even");
		}
	});
	it(2, "works with a retried test with a promise", () => {
		times++;
		return Q.fcall(() => {
			if (times % 2 !== 0) {
				throw new Error("not even");
			}
		});
	});
	it(2, "works with a retried test with callback", (done) => {
		times++;
		if (times % 2 !== 0) {
			return done(new Error("not even"));
		}
		done();
	});
	it.skip(3, "a test that will not run", () => {
	});
	it.skip("another test that will not run", () => {
	});
});

describe("Some non retry suite with before", () => {
	let valueAll;
	let valueEach;
	before(() => {
		valueAll = true;
	});
	beforeEach(() => {
		valueEach = true;
	});
	after(() => {
		valueAll = false;
	});
	afterEach(() => {
		valueEach = false;
	});
	it("works with a normal, non retry test", () => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
	});
	it("works with a normal, async, non retry test", (done) => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
		done();
	});
});

describe("Some retry suite with before with retry on tests", () => {
	let valueAll;
	let valueEach;
	before(() => {
		valueAll = true;
	});
	beforeEach(() => {
		valueEach = true;
	});
	after(() => {
		valueAll = false;
	});
	afterEach(() => {
		valueEach = false;
	});
	it(2, "works with a retried test not async", () => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
		times++;
		if (times % 2 !== 0) {
			throw new Error("not even");
		}
	});
	it(2, "works with a retried test with a promise", () => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
		times++;
		return Q.fcall(() => {
			if (times % 2 !== 0) {
				throw new Error("not even");
			}
		});
	});
	it(2, "works with a retried test with callback", (done) => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
		times++;
		if (times % 2 !== 0) {
			return done(new Error("not even"));
		}
		done();
	});
});

describe("Some retry suite with a beforeEach method", () => {
	let value = 0;
	const retryTimes = 3;
	beforeEach(() => {
		value++;
	});
	it(retryTimes, "should call beforeEach for every retry", () => {
		assert.equal(value, retryTimes);
		if (value !== retryTimes) {
			throw new Error("Not correct value");
		}
	});
});
