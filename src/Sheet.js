/**
 * Wrapper class that provides a simpeler interface to working with sheets
 * in the Google spreadsheet API.
 */
export default class Sheet {
	/**
	 * Create a new sheet instance.
	 * @param  {string} name (required) The name of the spreadsheet.
	 * @param  {Object} data The raw data retrieved from the API.
	 */
	constructor(name, data) {
		this.name = name;
		this.data = [];
		this.parse(data);
	}

	/**
	 * Parse the raw data retrieved from the API
	 * @param  {Object} data (required) The raw data retrieved from the API.
	 * @param  {string} data.values The values of the rows.
	 * @param  {string} data.majorDimension The format in which the API returned the raw data.
	 * @return {Sheet} returns itself for chaining.
	 */
	parse(data) {
		this.data = data.values;
	}

	/**
	 * Read a cell from the sheet.
	 * @param  {string} coord The coordinate of the cell to read in the A1 notation.
	 * @return {string} Returns the data at the requested coordinate,
	 * or undefined if invalid coordinates were given.
	 */
	read(coord) {
		const [x, y] = this.__coordinates(coord);

		if (x >= this.data.length || y >= this.data[x].length) {
			return (void 0);
		}

		return this.data[y][x];
	}

	/**
	 * Read a range of coordinates.
	 * @param  {string} start The begin coordinates in A1 notation.
	 * @param  {string} end The end coordinates in A1 notation.
	 * @return {Array} An array with values if a single row was requested, a two dimensional array is more rows were requested.
	 */
	range(start, end) {
		const [startX, startY] = this.__coordinates(start);
		const [endX, endY] = this.__coordinates(end);

		const result = [];
		if (startY === endY) {
			for (let i = startX; i <= endX; i++) {
				result.push(this.data[startY][i]);
			}
		}
		else if (startX === startY) {
			for (let i = startY; i <= endY; i++) {
				result.push(this.data[i][startX]);
			}
		} else {
			for (let i = startY; i <= endY; i++) {
				let row = [];
				for (let j = startX; j <= endX; j++) {
					row.push(this.data[i][j] || '');
				}
				result.push(row);
			}
		}

		return result;
	}

	/**
	 * Reads a column from the sheet.
	 * @param  {string} which The column to read (eg 'A', 'B', ...).
	 * @param  {string} [start='1'] The row to start reading from (1, 2, ...).
	 * @return {Array}  returns a flat array that represents the requested column.
	 */
	column(which, start = '1') {
		const [x, y] = this.__coordinates(which + start);
		const results = [];

		this.data.forEach((row, index) => {
			if (index >= y) {
				results.push(row.length <= x ? '' : row[x]); // empty rows are empty arrays.
			}
		});

		return results;
	}

	/**
	 * Read a row from the sheet.
	 * @param  {string} which The row to read.
	 * @param  {string} start The column to start from (defaults to the first column 'A').
	 * @return {Array}  returns a flat array that represents the requested row.
	 */
	row(which, start = 'A') {
		const [x, y] = this.__coordinates(start + which);

		if (y >= this.data.length) {
			return [];
		}

		return this.data[y].filter((_, index) => (x <= index));
	}

	/**
	 * Convert a coordinate from the A1 notation to [x,y] notation.
	 * @private
	 * @param  {string} coord The A1 notation of the coordinates.
	 * @return {Object} An object with the X property pointing to the X coordinate,
	 * and the Y property pointing to the Y coordinate.
	 */
	__coordinates(coord) {
		if ( ! coord.match(/[a-zA-Z][0-9]+/) ) {
			throw new Error(`Invalid coordinates given (${coord}).`);
		}

		const x = coord.charAt().toUpperCase().charCodeAt() - 65; // 65 = 'A'
		const y = parseInt(coord.substr(1), 10) - 1; // normalize 1 to 0

		return [x, y];
	}
}
