import { missing } from 'utils';

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
		this.range = (void 0);
	}

	/**
	 * Make GET request to retrieve meta data about the spreadsheet.
	 * @return {Spreadsheet} returns itself for chaining.
	 */
	init() {
	}
}
