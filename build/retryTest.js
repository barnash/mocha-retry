"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mocha = require("mocha");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RetryTest = function (_Runnable) {
	_inherits(RetryTest, _Runnable);

	function RetryTest(times, title, fn) {
		_classCallCheck(this, RetryTest);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RetryTest).call(this, title, fn));

		_this.times = times;
		_this.pending = !fn;
		_this.type = "test";
		return _this;
	}

	_createClass(RetryTest, [{
		key: "run",
		value: function run(fn) {
			var _this2 = this;

			var finished = undefined;
			var emitted = undefined;
			var runTimes = 1;
			var multiple = function multiple(err) {
				if (emitted) {
					return;
				}
				emitted = true;
				_this2.emit("error", err || new Error("done() called multiple times"));
			};
			var done = function done(err) {
				var start = undefined;
				if (_this2.timedOut) {
					// do nothing
				} else if (finished) {
						multiple(err || _this2._trace);
					} else if (err && runTimes !== _this2.times) {
						runTimes++;
						start = new Date();
						_this2._run(done);
					} else {
						_this2.clearTimeout();
						_this2.duration = new Date() - start;
						finished = true;
						fn(err);
					}
			};
			this._run(done);
		}
	}, {
		key: "_run",
		value: function _run(done) {
			var _this3 = this;

			this.timeout();
			var ctx = this.ctx;
			if (ctx) {
				ctx.runnable(this);
			}
			this.callback = done;
			if (this.async) {
				this.resetTimeout();
				try {
					this.fn.call(ctx, function (err) {
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
				var callFn = function callFn() {
					var result = _this3.fn.call(ctx);
					if (result && typeof result.then === "function") {
						_this3.resetTimeout();
						result.then(function () {
							return done();
						}, done);
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
	}]);

	return RetryTest;
}(_mocha.Runnable);

exports.default = RetryTest;
//# sourceMappingURL=retryTest.js.map