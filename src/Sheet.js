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

	/**
	 * Read a cell from the sheet.
	 * @param  {string} coord The coordinate of the cell to read in the A1 notation.
	 * @return {string} Returns the data at the requested coordinate
	 * or undefined if invalid coordinates were given.
	 */
	read(coord = missing`read position`) {
		const [x, y] = this.__coordinates(coord);

		if (x < this.data.length || y < this.data[x].length) {
			return (void 0);
		}

		return this.data[x][y];
	}

	/**
	 * Convert a coordinate from the A1 notation to [x,y] notation.
	 * @private
	 * @param  {string} coord The A1 notation of the coordinates.
	 * @return {Object} An object with the X property pointing to the X coordinate,
	 * and the Y property pointing to the Y coordinate.
	 */
	__coordinates(coord) {
		assert(coord.match(/[a-zA-Z][0-9]+/), 'Invalid coordinates given.');
		const x = coord.charAt().toUpperCase().charCodeAt() - 65; // 65 = 'A'
		const y = parseInt(coord.substr(1), 10);

		return { x, y };
	}
}
