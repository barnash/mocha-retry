"use strict";

export function normalize(fallback, ...args) {
	const result = {};
	args.forEach(arg => {
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
