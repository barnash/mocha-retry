"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mocha = require("mocha");

var _retryHook = require("./retryHook");

var _retryHook2 = _interopRequireDefault(_retryHook);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RetrySuite = function (_Suite) {
	_inherits(RetrySuite, _Suite);

	function RetrySuite() {
		_classCallCheck(this, RetrySuite);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RetrySuite).apply(this, arguments));
	}

	_createClass(RetrySuite, [{
		key: "beforeAllWithRetry",
		value: function beforeAllWithRetry() {
			if (this.pending) {
				return;
			}

			var _normalize = _utils.normalize.apply(undefined, [this.times].concat(Array.prototype.slice.call(arguments)));

			var times = _normalize.times;
			var title = _normalize.title;
			var fn = _normalize.fn;

			var hook = new _retryHook2.default(times, "\"before all\" hook: " + (title || "--"), fn);
			hook.parent = this;
			hook.timeout(this.timeout());
			hook.slow(this.slow());
			hook.ctx = this.ctx;
			this._beforeAll.push(hook);
			this.emit("beforeAll", hook);
		}
	}, {
		key: "beforeEachWithRetry",
		value: function beforeEachWithRetry() {
			if (this.pending) {
				return;
			}

			var _normalize2 = _utils.normalize.apply(undefined, [this.times].concat(Array.prototype.slice.call(arguments)));

			var times = _normalize2.times;
			var title = _normalize2.title;
			var fn = _normalize2.fn;

			var hook = new _retryHook2.default(times, "\"before each\" hook: " + (title || "--"), fn);
			hook.parent = this;
			hook.timeout(this.timeout());
			hook.slow(this.slow());
			hook.ctx = this.ctx;
			this._beforeEach.push(hook);
			this.emit("beforeEach", hook);
		}
	}, {
		key: "afterAllWithRetry",
		value: function afterAllWithRetry() {
			if (this.pending) {
				return;
			}

			var _normalize3 = _utils.normalize.apply(undefined, [this.times].concat(Array.prototype.slice.call(arguments)));

			var times = _normalize3.times;
			var title = _normalize3.title;
			var fn = _normalize3.fn;

			var hook = new _retryHook2.default(times, "\"after all\" hook: " + (title || "--"), fn);
			hook.parent = this;
			hook.timeout(this.timeout());
			hook.slow(this.slow());
			hook.ctx = this.ctx;
			this._afterAll.push(hook);
			this.emit("afterAll", hook);
		}
	}, {
		key: "afterEachWithRetry",
		value: function afterEachWithRetry() {
			if (this.pending) {
				return;
			}

			var _normalize4 = _utils.normalize.apply(undefined, [this.times].concat(Array.prototype.slice.call(arguments)));

			var times = _normalize4.times;
			var title = _normalize4.title;
			var fn = _normalize4.fn;

			var hook = new _retryHook2.default(times, "\"after each\" hook: " + (title || "--"), fn);
			hook.parent = this;
			hook.timeout(this.timeout());
			hook.slow(this.slow());
			hook.ctx = this.ctx;
			this._afterEach.push(hook);
			this.emit("afterEach", hook);
		}
	}]);

	return RetrySuite;
}(_mocha.Suite);

exports.default = RetrySuite;
//# sourceMappingURL=retrySuite.js.map