"use strict";

import {Suite} from "mocha";
import RetryHook from "./retryHook";

Suite.prototype.beforeAllWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		[times, title, fn] = [void 0, times.name, times];
	} else if (!fn) {
		if (typeof times === "number") {
			[title, fn] = [void 0, title];
		} else {
			[times, title, fn] = [void 0, times, title];
		}
		if (typeof title === "function") {
			[title, fn] = [fn.name, title];
		}
	}

	times = times || this.times;

	title = "\"before all\" hook" + (title ? ": " + title : "");
	const hook = new RetryHook(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._beforeAll.push(hook);
	this.emit("beforeAll", hook);
	return this;
};

Suite.prototype.beforeEachWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		[times, title, fn] = [void 0, times.name, times];
	} else if (!fn) {
		if (typeof times === "number") {
			[title, fn] = [void 0, title];
		} else {
			[times, title, fn] = [void 0, times, title];
		}
		if (typeof title === "function") {
			[title, fn] = [fn.name, title];
		}
	}

	times = times || this.times;

	title = "\"before each\" hook" + (title ? ": " + title : "");
	const hook = new RetryHook(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._beforeEach.push(hook);
	this.emit("beforeEach", hook);
	return this;
};

Suite.prototype.afterAllWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		[times, title, fn] = [void 0, times.name, times];
	} else if (!fn) {
		if (typeof times === "number") {
			[title, fn] = [void 0, title];
		} else {
			[times, title, fn] = [void 0, times, title];
		}
		if (typeof title === "function") {
			[title, fn] = [fn.name, title];
		}
	}

	times = times || this.times;

	title = "\"after all\" hook" + (title ? ": " + title : "");
	const hook = new RetryHook(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._afterAll.push(hook);
	this.emit("afterAll", hook);
	return this;
};

Suite.prototype.afterEachWithRetry = function (times, title, fn) {
	if (this.pending) {
		return this;
	}

	if (!title) {
		[times, title, fn] = [void 0, times.name, times];
	} else if (!fn) {
		if (typeof times === "number") {
			[title, fn] = [void 0, title];
		} else {
			[times, title, fn] = [void 0, times, title];
		}
		if (typeof title === "function") {
			[title, fn] = [fn.name, title];
		}
	}

	times = times || this.times;

	title = "\"after each\" hook" + (title ? ": " + title : "");
	const hook = new RetryHook(times, title, fn);
	hook.parent = this;
	hook.timeout(this.timeout());
	hook.slow(this.slow());
	hook.ctx = this.ctx;
	this._afterEach.push(hook);
	this.emit("afterEach", hook);
	return this;
};
