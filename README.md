# SpreadsheetJS
## A simple Javascript API to work with public Google spreadsheets

TODO write tests

### Usage

#### Spreadsheet usage
To retrieve a spreadsheet, you simply create an instance of the `Spreadsheet` class:
```js
import { Spreadsheet } from 'spreadsheetjs';

const spreadsheet = new Spreadsheet('<hash>', '<key>');
```
`hash` is the hash identifier of your spreadsheet and `key` is your Google API key which the library will use to authenticate with Google.

Before you can use the spreadsheet, you'll have to load it's meta data so it's aware of which sheets and spreadsheet it should use. The spreadsheet will automatically load it's own meta data, but to be sure you have access to the meta data it exposes a `wait` function, which returns a Promise instance.
```js
spreadsheet.wait().then((spreadsheet) => {
	// You can use your spreadsheet here.
});
```

To list all available sheets in a spreadsheet, you can use the `sheets` property of the spreadsheet
```js
const sheets = spreadsheet.sheets;
```

You will notice the `sheets` property returns an array of strings; to retrieve the actual sheet for processing, you'll have to use the `sheet` method
```js
spreadsheet.sheet('<name>').then((sheet) => {
	// You can use your sheet here.
});
```
> If you omit the `name` parameter, it'll default to the first sheet.

#### Sheet usage

Once you retrieved your `sheet` instance from the spreadsheet, things really get interesting!

The sheet class exposes two properties; `name` and `data`. As you can guess, the `name` property is the name of the sheet, and the `data` is the raw data from the Google API that the spreadsheet manipulates internally to work it's magic.

If you want to read a cell from the sheet, you can use the `read` function
```js
const value = sheet.read('A1');
```
As you can see, you can pass in Excell coordinates as you're used to working with.

Obviously one cell at a time is tedious to work with, so let's say you want to read cell B1 to G5
```js
const values = sheet.range('B1', 'G5');
```
this will return a 2 dimensional array that could look something like this:
```js
[
	['B1', 'B2', 'B3', 'B4', 'B5'],
	['C1', 'C2', 'C3', 'C4', 'C5'],
	['D1', 'D2', 'D3', 'D4', 'D5'],
	['E1', 'E2', 'E3', 'E4', 'E5'],
	['F1', 'F2', 'F3', 'F4', 'F5'],
	['G1', 'G2', 'G3', 'G4', 'G5'],
]
```
> An empty row will be returned as an empty array (`[]`) following the Google API's example.

Of course you can use the range function to retrieve columns and rows, but it's easier to use the respective `column` and `row` function for that, as they return flat arrays rather than 2 dimensional arrays
```js
const column = sheet.column('B'); // returns the B column
const row = sheet.row('3'); // returns the third row
```

But what if you don't want the entire row, or the entire column? We got you, pass in a second parameter to skip some parts;
```js
const column = sheet.column('B', '5'); // returns the B column starting on row 5
const row = sheet.row('3', 'C'); // returns the third row starting from column C
```

### Available commands

- ``` npm run build ```
	- builds the sources

- ``` npm test ```
	- runs all the available tests

- ``` npm test -- watch ```
	- runs all the available tests and re-runs them on changes.
