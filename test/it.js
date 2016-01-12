"use strict";

import Q from "q";

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
		valueEach.should.be.true;  // eslint-disable-line no-unused-expressions
		valueAll.should.be.true;  // eslint-disable-line no-unused-expressions
	});
	it("works with a normal, async, non retry test", (done) => {
		valueEach.should.be.true;  // eslint-disable-line no-unused-expressions
		valueAll.should.be.true;  // eslint-disable-line no-unused-expressions
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
		valueEach.should.be.true;  // eslint-disable-line no-unused-expressions
		valueAll.should.be.true;  // eslint-disable-line no-unused-expressions
		times++;
		if (times % 2 !== 0) {
			throw new Error("not even");
		}
	});
	it(2, "works with a retried test with a promise", () => {
		valueEach.should.be.true;  // eslint-disable-line no-unused-expressions
		valueAll.should.be.true;  // eslint-disable-line no-unused-expressions
		times++;
		return Q.fcall(() => {
			if (times % 2 !== 0) {
				throw new Error("not even");
			}
		});
	});
	it(2, "works with a retried test with callback", (done) => {
		valueEach.should.be.true;  // eslint-disable-line no-unused-expressions
		valueAll.should.be.true;  // eslint-disable-line no-unused-expressions
		times++;
		if (times % 2 !== 0) {
			return done(new Error("not even"));
		}
		done();
	});
});


