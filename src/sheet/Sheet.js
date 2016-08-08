import { missing, assert } from 'utils';

/**
 * Wrapper class that provides a simpeler interface to working with sheets
 * in the Google spreadsheet API
 */
export default class Sheet {
	/**
	 * Create a new sheet instance.
	 * @param  {string} name (required) The name of the spreadsheet.
	 * @param  {Object} data The raw data retrieved from the API.
	 */
	constructor(name = missing`sheet name`, data) {
		this.name = name;
		this.data = [];
		this.parse(data);
	}

	/**
	 * Parse the raw data retrieved from the API
	 * @param  {Object} data (required) The raw data retrieved from the API
	 * @param  {string} data.values The values of the rows.
	 * @param  {string} data.majorDimension The format in which the API returned the raw data.
	 * @return {Sheet} returns itself for chaining.
	 */
	parse(data = missing`sheet data`) {
		assert(data.values !== (void 0));
		assert(data.majorDimension === 'ROWS');
		this.data = data.values;
	}

	read(from = missing`read position`, to) {
	}
}
