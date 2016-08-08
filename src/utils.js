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

const get = (url) => new Promise((resolve, reject) => {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState === 4) {
			let response = xhttp.responseText;
			if (xhttp.getResponseHeader('Content-Type').match(/json/)) {
				response = JSON.parse(response);
			}
			if (xhttp.status === 200) {
				resolve(response);
			} else {
				reject(xhttp.status, response, xhttp);
			}
		}
	};
	xhttp.open('GET', url, true);
	xhttp.send();
});

export default {
	missing,
	assert,
	get,
};
