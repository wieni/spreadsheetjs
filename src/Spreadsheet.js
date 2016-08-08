import { missing, get } from 'utils';

/**
 * A simple wrapper class that exposes the functionality of the Google spreadsheet API (v4).
 */
export default class Spreadsheet {
	/**
	 * Create a new spreadsheet.
	 * @param  {string} key Your Google API key.
	 * @param  {string} hash Your Spreadsheet hash.
	 */
	constructor(key = missing`API key`, hash = missing`Spreadsheet hash`) {
		this.key = key;
		this.hash = hash;
		this.ready = false;
		this.title = null;
		this.locale = null;
		this.sheets = [];
		this.timeZone = null;
	}

	/**
	 * Make GET request to retrieve meta data about the spreadsheet.
	 * @return {Spreadsheet} returns itself for chaining.
	 */
	init() {
		const promise = get(`https://sheets.googleapis.com/v4/spreadsheets/${this.hash}?key=${this.key}`);
		promise.then(this.__parse)
		.catch((status, response) => {
			throw new Error(`Server responded with ${status}: ${JSON.stringify(response)}`);
		});

		return this;
	}

	/**
	 * Parse the raw data from the API.
	 * @param  {Object} raw The raw data returned by the API.
	 */
	__parse(raw) {
		this.title = raw.properties.title;
		this.locale = raw.properties.locale;
		this.timeZone = raw.properties.timeZone;
		this.sheets = [];
		raw.sheets.forEach((sheet) => this.sheets.push(sheet.properties.title));

		this.ready = true;
	}
}
