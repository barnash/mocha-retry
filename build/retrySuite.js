"use strict";

var _mocha = require("mocha");

var _retryHook = require("./retryHook");

var _retryHook2 = _interopRequireDefault(_retryHook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mocha.Suite.prototype.beforeAllWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		var _ref = [void 0, times.name, times];
		times = _ref[0];
		title = _ref[1];
		fn = _ref[2];
	} else if (!fn) {
		if (typeof times === "number") {
			var _ref2 = [void 0, title];
			title = _ref2[0];
			fn = _ref2[1];
		} else {
			var _ref3 = [void 0, times, title];
			times = _ref3[0];
			title = _ref3[1];
			fn = _ref3[2];
		}
		if (typeof title === "function") {
			var _ref4 = [fn.name, title];
			title = _ref4[0];
			fn = _ref4[1];
		}
	}

	times = times || this.times;

	title = "\"before all\" hook" + (title ? ": " + title : "");
	var hook = new _retryHook2.default(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._beforeAll.push(hook);
	this.emit("beforeAll", hook);
	return this;
};

_mocha.Suite.prototype.beforeEachWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		var _ref5 = [void 0, times.name, times];
		times = _ref5[0];
		title = _ref5[1];
		fn = _ref5[2];
	} else if (!fn) {
		if (typeof times === "number") {
			var _ref6 = [void 0, title];
			title = _ref6[0];
			fn = _ref6[1];
		} else {
			var _ref7 = [void 0, times, title];
			times = _ref7[0];
			title = _ref7[1];
			fn = _ref7[2];
		}
		if (typeof title === "function") {
			var _ref8 = [fn.name, title];
			title = _ref8[0];
			fn = _ref8[1];
		}
	}

	times = times || this.times;

	title = "\"before each\" hook" + (title ? ": " + title : "");
	var hook = new _retryHook2.default(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._beforeEach.push(hook);
	this.emit("beforeEach", hook);
	return this;
};

_mocha.Suite.prototype.afterAllWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		var _ref9 = [void 0, times.name, times];
		times = _ref9[0];
		title = _ref9[1];
		fn = _ref9[2];
	} else if (!fn) {
		if (typeof times === "number") {
			var _ref10 = [void 0, title];
			title = _ref10[0];
			fn = _ref10[1];
		} else {
			var _ref11 = [void 0, times, title];
			times = _ref11[0];
			title = _ref11[1];
			fn = _ref11[2];
		}
		if (typeof title === "function") {
			var _ref12 = [fn.name, title];
			title = _ref12[0];
			fn = _ref12[1];
		}
	}

	times = times || this.times;

	title = "\"after all\" hook" + (title ? ": " + title : "");
	var hook = new _retryHook2.default(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._afterAll.push(hook);
	this.emit("afterAll", hook);
	return this;
};

_mocha.Suite.prototype.afterEachWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		var _ref13 = [void 0, times.name, times];
		times = _ref13[0];
		title = _ref13[1];
		fn = _ref13[2];
	} else if (!fn) {
		if (typeof times === "number") {
			var _ref14 = [void 0, title];
			title = _ref14[0];
			fn = _ref14[1];
		} else {
			var _ref15 = [void 0, times, title];
			times = _ref15[0];
			title = _ref15[1];
			fn = _ref15[2];
		}
		if (typeof title === "function") {
			var _ref16 = [fn.name, title];
			title = _ref16[0];
			fn = _ref16[1];
		}
	}

	times = times || this.times;

	title = "\"after each\" hook" + (title ? ": " + title : "");
	var hook = new _retryHook2.default(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._afterEach.push(hook);
	this.emit("afterEach", hook);
	return this;
};
//# sourceMappingURL=retrySuite.js.map