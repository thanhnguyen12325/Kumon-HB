/**
 * Displaying Google Sheets Data on Web Apps.
 * Created By: bpwebs.com
 */


//Spreadsheet ID for data retrieval.
const SPREADSHEET_ID = '1nDVnBP1HlLeDG0bDA_CidHZjVBlsC2d5Il6BFtVHghM'; // ! CHANGE
//Data range (sheet and cells) within the spreadsheet.
const DATA_RANGE = "Data!A1:F"; // ! CHANGE


/**
 * Serves an HTML page generated from the 'Index' template file.
 * This function dynamically creates the content of the webpage and prepares it for display in a browser.
 * It also adds a meta tag to optimize rendering on mobile devices.
 * 
 * @returns {HtmlOutput} An HTML output object ready for the browser.
 */
function doGet() {
  let html = HtmlService.createTemplateFromFile('Index').evaluate();
  let htmlOutput = HtmlService.createHtmlOutput(html);
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}

/**
 * Fetches and formats data from a Google Sheet into an array of objects.
 * Expects the first row of the data range to contain column headers.
 *
 * @param {string} SPREADSHEET_ID The ID of the Google Spreadsheet.
 * @param {string} DATA_RANGE The range of cells containing the data.
 * @returns {array} An array of objects representing the spreadsheet data. 
 */
function getData() {
  const range = Sheets.Spreadsheets.Values.get(SPREADSHEET_ID, DATA_RANGE);
  const data = range.values;

  // Extract headers
  const headers = data.shift(); // Remove the first row and use it as headers

  // Format the rest of the data as objects
  const tableData = data.map(row => {
    const obj = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    return obj;
  });

  Logger.log(tableData);
  return tableData;
}

/**
 * Includes the content of an external HTML file.
 * 
 * @param {string} fileName The name of the HTML file to include.
 * @returns {string} The HTML content of the file.
 */
function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}
