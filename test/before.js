"use strict";

import assert from "assert";

describe("Some suite with before and no retry", () => {
	let valueAll = 0;
	before(() => {
		valueAll += 2;
		if (valueAll !== 2) {
			throw new Error("has to be 2");
		}
	});
	it("verifies the value", () => {
		assert.equal(valueAll, 2);
	});
	it("verifies the value again", () => {
		assert.equal(valueAll, 2);
	});
});

describe("Some suite with before with retry", () => {
	let valueAll = 0;
	before(2, () => {
		valueAll++;
		if (valueAll !== 2) {
			throw new Error("at least 2");
		}
	});
	it("verifies the value", () => {
		assert.equal(valueAll, 2);
	});
	it("verifies the value again", () => {
		assert.equal(valueAll, 2);
	});
});

describe("Some suite with beforeEach and no retry", () => {
	let valueEach = 0;
	beforeEach(() => {
		valueEach += 2;
		if (valueEach % 2 !== 0) {
			throw new Error("isnt even");
		}
	});
	it("verifies the value once", () => {
		assert.equal(valueEach, 2);
	});
	it("verifies the value twice", () => {
		assert.equal(valueEach, 4);
	});
});

describe("Some suite with beforeEach with retry", () => {
	let valueEach = 0;
	beforeEach(2, () => {
		valueEach++;
		if (valueEach % 2 !== 0) {
			throw new Error("isnt even");
		}
	});
	it("verifies the value once", () => {
		assert.equal(valueEach, 2);
	});
	it("verifies the value twice", () => {
		assert.equal(valueEach, 4);
	});
});

describe("Before all using global default retry", () => {
	process.env.MOCHA_RETRY = 2;
	describe("inner suite (needed to apply global retry)", () => {
		let valueAll = 0;
		before(() => {
			valueAll++;
			if (valueAll !== 2) {
				throw new Error("at least 2");
			}
		});
		it("verifies the value", () => {
			assert.equal(valueAll, 2);
		});
		it("verifies the value again", () => {
			assert.equal(valueAll, 2);
		});
	});
});

delete process.env.MOCHA_RETRY;

describe("Before all With global default retry but overriding it", () => {
	process.env.MOCHA_RETRY = 2;
	describe("inner suite with specific retry (needed to apply global retry)", () => {
		let valueAll = 0;
		before(3, () => {
			valueAll++;
			if (valueAll !== 3) {
				throw new Error("at least 3");
			}
		});
		it("verifies the value", () => {
			assert.equal(valueAll, 3);
		});
		it("verifies the value again", () => {
			assert.equal(valueAll, 3);
		});
	});
});

delete process.env.MOCHA_RETRY;

describe("Before each using global default retry", () => {
	process.env.MOCHA_RETRY = 2;
	describe("inner suite (needed to apply global retry)", () => {
		let valueEach = 0;
		beforeEach(() => {
			valueEach++;
			if (valueEach % 2 !== 0) {
				throw new Error("isnt even");
			}
		});
		it("verifies the value once", () => {
			assert.equal(valueEach, 2);
		});
		it("verifies the value twice", () => {
			assert.equal(valueEach, 4);
		});
	});
});

delete process.env.MOCHA_RETRY;

describe("Before each With global default retry but overriding it", () => {
	process.env.MOCHA_RETRY = 2;
	describe("inner suite with specific retry (needed to apply global retry)", () => {
		let valueEach = 0;
		beforeEach(3, () => {
			valueEach++;
			if (valueEach % 3 !== 0) {
				throw new Error("isnt three");
			}
		});
		it("verifies the value once", () => {
			assert.equal(valueEach, 3);
		});
		it("verifies the value twice", () => {
			assert.equal(valueEach, 6);
		});
	});
});

delete process.env.MOCHA_RETRY;
