"use strict";

import {Suite} from "mocha";
import RetryHook from "./retryHook";
import {normalize} from "./utils";

export default class RetrySuite extends Suite {

	beforeAllWithRetry() {
		if (this.pending) {
			return;
		}

		const {times, title, fn} = normalize(this.times, ...arguments);

		const hook = new RetryHook(times, `"before all" hook${title ? ": " + title : ""}`, fn);
		hook.parent = this;
		hook.timeout(this.timeout());
		hook.slow(this.slow());
		hook.ctx = this.ctx;
		this._beforeAll.push(hook);
		this.emit("beforeAll", hook);
	}

	beforeEachWithRetry() {
		if (this.pending) {
			return;
		}

		const {times, title, fn} = normalize(this.times, ...arguments);

		const hook = new RetryHook(times, `"before each" hook${title ? ": " + title : ""}`, fn);
		hook.parent = this;
		hook.timeout(this.timeout());
		hook.slow(this.slow());
		hook.ctx = this.ctx;
		this._beforeEach.push(hook);
		this.emit("beforeEach", hook);
	}

	afterAllWithRetry() {
		if (this.pending) {
			return;
		}

		const {times, title, fn} = normalize(this.times, ...arguments);

		const hook = new RetryHook(times, `"after all${title ? ": " + title : ""}`, fn);
		hook.parent = this;
		hook.timeout(this.timeout());
		hook.slow(this.slow());
		hook.ctx = this.ctx;
		this._afterAll.push(hook);
		this.emit("afterAll", hook);
	}

	afterEachWithRetry() {
		if (this.pending) {
			return;
		}

		const {times, title, fn} = normalize(this.times, ...arguments);

		const hook = new RetryHook(times, `"after each${title ? ": " + title : ""}`, fn);
		hook.parent = this;
		hook.timeout(this.timeout());
		hook.slow(this.slow());
		hook.ctx = this.ctx;
		this._afterEach.push(hook);
		this.emit("afterEach", hook);
	}

}
