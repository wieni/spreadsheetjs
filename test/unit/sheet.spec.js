/* eslint-env jasmine,es6 */
import Sheet from 'sheet/Sheet';

describe('Sheet', () => {
	it('transpiles to a callable function', () => {
		expect(typeof Sheet).toBe('function');
	});

	xit('has required parameters', () => {
	});
});
