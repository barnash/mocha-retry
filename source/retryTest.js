"use strict";

import {Runner, Runnable} from "mocha";

export default class RetryTest extends Runnable {

	constructor(times, title, fn) {
		super(title, fn);
		this.times = times;
		this.pending = !fn;
	}

	run(fn) {
		let finished;
		let emitted;
		let runTimes = 1;
		const runner = new Runner(this.suite);
		const multiple = (err) => {
			if (emitted) {
				return;
			}
			emitted = true;
			this.emit("error", err || new Error("done() called multiple times"));
		};
		const done = (err) => {
			let start;
			if (this.timedOut) {
				// do nothing
			} else if (finished) {
				multiple(err || this._trace);
			} else if (err && runTimes !== this.times) {
				runTimes++;
				start = new Date;
				runner.hook("beforeEach", () => this._run(done));
			} else {
				this.clearTimeout();
				this.duration = new Date - start;
				finished = true;
				fn(err);
			}
		};
		this._run(done);
	}

	_run(done) {
		this.timeout();
		const ctx = this.ctx;
		if (ctx) {
			ctx.runnable(this);
		}
		this.callback = done;
		if (this.async) {
			this.resetTimeout();
			try {
				this.fn.call(ctx, (err) => {
					if (err instanceof Error || toString.call(err) === "[object Error]") {
						done(err);
					} else if (err) {
						done(new Error("done() invoked with non-Error: " + err));
					} else {
						done();
					}
				});
			} catch (error) {
				done(error);
			}
		} else if (this.asyncOnly) {
			done(new Error("--async-only option in use without declaring `done()`"));
		} else {
			const callFn = () => {
				const result = this.fn.call(ctx);
				if (result && typeof result.then === "function") {
					this.resetTimeout();
					result.then(() => done(), done);
				} else {
					done();
				}
			};
			try {
				if (this.pending) {
					done();
				} else {
					callFn();
				}
			} catch (error) {
				done(error);
			}
		}
	}
}
