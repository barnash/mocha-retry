"use strict";

import Q from "q";
import assert from "assert";

let times = 0;

describe(2, "A retry suite", () => {
	it("works with a retried test not async", () => {
		times++;
		if (times % 2 !== 0) {
			throw new Error("not even");
		}
	});
	it("works with a retried test with a promise", () => {
		times++;
		return Q.fcall(() => {
			if (times % 2 !== 0) {
				throw new Error("not even");
			}
		});
	});
	it("works with a retried test with callback", (done) => {
		times++;
		if (times % 2 !== 0) {
			return done(new Error("not even"));
		}
		return done();
	});
});

describe(2, "Some retry suite with before", () => {
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
	it("works with a retried test not async", () => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
		times++;
		if (times % 2 !== 0) {
			throw new Error("not even");
		}
	});
	it("works with a retried test with a promise", () => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
		times++;
		return Q.fcall(() => {
			if (times % 2 !== 0) {
				throw new Error("not even");
			}
		});
	});
	it("works with a retried test with callback", (done) => {
		assert.equal(valueEach, true);
		assert.equal(valueAll, true);
		times++;
		if (times % 2 !== 0) {
			return done(new Error("not even"));
		}
		done();
	});
});

describe(2, "A retry suite with tests with retry", () => {
	before(() => {
		times = 0;
	});
	it(4, "works with a retried test not async", () => {
		times++;
		if (times % 4 !== 0) {
			throw new Error("cant divide by 4");
		}
	});
	it(4, "works with a retried test with a promise", () => {
		times++;
		return Q.fcall(() => {
			if (times % 4 !== 0) {
				throw new Error("cant divide by 4");
			}
		});
	});
	it(4, "works with a retried test with callback", (done) => {
		times++;
		if (times % 4 !== 0) {
			return done(new Error("cant divide by 4"));
		}
		done();
	});
});

describe.skip(2, "A skipped retry suite", () => {
	it("a test that will not run", () => {
	});
});

describe.skip("A skipped non retry suite", () => {
	it("another test that will not run", () => {
	});
});

describe(2, "A retry suite with a sub suite", () => {
	describe("A sub suite without retry defined", () => {
		before(() => {
			times = 0;
		});
		it("works with a retried test not async", () => {
			times++;
			if (times % 2 !== 0) {
				throw new Error("not even");
			}
		});
		it("works with a retried test with a promise", () => {
			times++;
			return Q.fcall(() => {
				if (times % 2 !== 0) {
					throw new Error("not even");
				}
			});
		});
		it("works with a retried test with callback", (done) => {
			times++;
			if (times % 2 !== 0) {
				return done(new Error("not even"));
			}
			done();
		});
	});
	describe(3, "A sub suite with retry redefined", () => {
		before(() => {
			times = 0;
		});
		it("works with a retried test not async", () => {
			times++;
			if (times % 3 !== 0) {
				throw new Error("not divisible by 3");
			}
		});
		it("works with a retried test with a promise", () => {
			times++;
			return Q.fcall(() => {
				if (times % 3 !== 0) {
					throw new Error("not divisible by 3");
				}
			});
		});
		it("works with a retried test with callback", (done) => {
			times++;
			if (times % 3 !== 0) {
				return done(new Error("not divisible by 3"));
			}
			done();
		});
	});
});

describe("Using global default retry", () => {
	process.env.MOCHA_RETRY = 2;
	before(() => {
		times = 0;
	});
	describe("inner suite (needed to apply global retry)", () => {
		it("works with a retried test not async", () => {
			times++;
			if (times % 2 !== 0) {
				throw new Error("not even");
			}
		});
		it("works with a retried test with a promise", () => {
			times++;
			return Q.fcall(() => {
				if (times % 2 !== 0) {
					throw new Error("not even");
				}
			});
		});
		it("works with a retried test with callback", (done) => {
			times++;
			if (times % 2 !== 0) {
				return done(new Error("not even"));
			}
			done();
		});
	});
});

delete process.env.MOCHA_RETRY;

describe("With global default retry but overriding it", () => {
	process.env.MOCHA_RETRY = 2;
	before(() => {
		times = 0;
	});
	describe(3, "inner suite with specific retry (needed to apply global retry)", () => {
		it("works with a retried test not async", () => {
			times++;
			if (times % 3 !== 0) {
				throw new Error("not three");
			}
		});
		it("works with a retried test with a promise", () => {
			times++;
			return Q.fcall(() => {
				if (times % 3 !== 0) {
					throw new Error("not three");
				}
			});
		});
		it("works with a retried test with callback", (done) => {
			times++;
			if (times % 3 !== 0) {
				return done(new Error("not three"));
			}
			done();
		});
	});
	describe("inner suite with tests that specify retry (needed to apply global retry)", () => {
		it(3, "works with a retried test not async", () => {
			times++;
			if (times % 3 !== 0) {
				throw new Error("not three");
			}
		});
		it(3, "works with a retried test with a promise", () => {
			times++;
			return Q.fcall(() => {
				if (times % 3 !== 0) {
					throw new Error("not three");
				}
			});
		});
		it(3, "works with a retried test with callback", (done) => {
			times++;
			if (times % 3 !== 0) {
				return done(new Error("not three"));
			}
			done();
		});
	});
});

delete process.env.MOCHA_RETRY;
