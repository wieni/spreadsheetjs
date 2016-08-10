import Sheet from './Sheet';

/**
 * A simple wrapper class that exposes the functionality of the Google spreadsheet API (v4).
 */
export default class Spreadsheet {
	/**
	 * Create a new spreadsheet.
	 * @param  {string} key Your Google API key.
	 * @param  {string} hash Your Spreadsheet hash.
	 */
	constructor(hash, key = 'you_forgot_your_api_key') {
		this.key = key;
		this.hash = hash;
		this.ready = false;
		this.title = null;
		this.locale = null;
		this.sheets = [];
		this.timeZone = null;
		this.__cache = new Map();
		this.__parsing = new Promise((resolve, reject) => {
			fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.hash}?key=${this.key}`)
				.done(this.__parse.bind(this, resolve))
				.catch(reject);
		});
	}

	/**
	 * Wait for the current long pending task to finish.
	 * @return {Promise} The promise that resolves when the Spreadsheet is done loading.
	 */
	wait() {
		return this.__parsing;
	}

	/**
	 * Load a sheet from the spreadsheet.
	 * @param  {string} name The name of the sheet to request (if left empty, the first sheet is taken).
	 * @return {Promise}                       [description]
	 */
	sheet(name = this.sheets[0]) {
		if (this.__cache.has(name)) {
			return this.__cache.get(name);
		}
		const promise = new Promise((resolve, reject) => {
			fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.hash}/values/${name}?key=${this.key}`)
				.done((data) => {
					const sheet = new Sheet(name, data);
					resolve(sheet);
				})
				.catch(reject);
		});

		this.__cache.set(name, promise);
		return promise;
	}

	/**
	 * Parse the raw data from the API.
	 * @private
	 * @param  {callback} The resolve callback (internally used).
	 * @param  {Object} raw The raw data returned by the API.
	 */
	__parse(resolve, raw) {
		this.title = raw.properties.title;
		this.locale = raw.properties.locale;
		this.timeZone = raw.properties.timeZone;
		this.sheets = [];
		raw.sheets.forEach((sheet) => this.sheets.push(sheet.properties.title));

		this.ready = true;

		resolve(this);
	}
}
