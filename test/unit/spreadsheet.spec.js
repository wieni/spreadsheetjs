/* eslint-env jasmine,es6 */
import Spreadsheet from 'Spreadsheet';

describe('Spreadsheet', () => {
	it('transpiles to a callable function', () => {
		expect(typeof Spreadsheet).toBe('function');
	});

	xit('retrieves meta data when calling init', () => {
	});

	xit('fails when meta data fetching fails', () => {
	});

	xit('parses the API data into properties', () => {
	});

	xit('lazy loads sheet data', () => {
	});
});
