/* eslint-env jasmine,es6 */
import Spreadsheet from 'Spreadsheet';

describe('Spreadsheet', () => {
	it('transpiles to a callable function', () => {
		expect(typeof Spreadsheet).toBe('function');
	});

	xit('has required parameters', () => {
	});

	xit('can retrieve meta data about itself', () => {
	});
});
