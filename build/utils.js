"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.normalize = normalize;
function normalize(fallback) {
	var result = {};

	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	args.forEach(function (arg) {
		switch (Object.prototype.toString.call(arg)) {
			case "[object Number]":
				result.times = arg;
				break;
			case "[object String]":
				result.title = arg;
				break;
			case "[object Function]":
				result.fn = arg;
				break;
			default:
				break;
		}
	});

	result.times = result.times || fallback;
	result.title = result.title || result.fn.name;
	// result.fn = skipped test

	return result;
}
//# sourceMappingURL=utils.js.map