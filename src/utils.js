/**
 * Throw an error when a required parameter wasn't passed.
 * @type {string} Describes the parameter that's missing.
 */
const missing = x => {
	throw new Error(`Required parameter ${x} not passed.`);
};

export default {
	missing,
};
