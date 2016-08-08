/**
 * Throw an error when a required parameter wasn't passed.
 * @type {string} Describes the parameter that's missing.
 */
const missing = x => {
	throw new Error(`Required parameter ${x} not passed.`);
};

const assert = (condition, message) => {
	if (!condition) {
		throw new Error(message || 'Assertion failed.');
	}
};

export default {
	missing,
	assert,
};
