/*
 * Summary of Comments and Annotations:
 *
 * This file contains functions for interacting with Google Sheets data, including:
 * - Getting sheet data
 * - Adding new sheets
 * - Deleting sheets
 * - Setting the active sheet
 *
 * These functions are used by the client-side code to manage estimates within the Google Sheet.
 */

const getSheets = () => SpreadsheetApp.getActive().getSheets(); // Gets all sheets in the active spreadsheet

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName(); // Gets the name of the currently active sheet

export const getSheetsData = () => {
  // Returns an array of sheet data objects, each containing:
  // - name: The name of the sheet
  // - index: The index of the sheet in the spreadsheet
  // - isActive: Whether the sheet is currently active
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = (sheetTitle, data = {}) => {
  // Adds a new sheet to the spreadsheet with the given title and data
  const { customerName, estimateName, date, lineItems } = data;

  // Validation: Ensures required data is present before creating a sheet
  if (!customerName || !estimateName || !date || !Array.isArray(lineItems)) {
    throw new Error('Missing required data for creating a sheet.');
  }

  const sheet = SpreadsheetApp.getActive().insertSheet(sheetTitle); // Creates a new sheet

  // Sets up headers in the first row
  const headers = ['Customer Name', 'Estimate Name', 'Date', 'Description', 'Materials', 'Engineering Hours', 'Production Hours', 'Finish Hours', 'Installation Hours'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Adds customer information to the second row
  const customerInfo = [customerName, estimateName, date, '', '', '', '', '', ''];
  sheet.getRange(2, 1, 1, customerInfo.length).setValues([customerInfo]);

  // Adds line items starting from the third row
  const lineItemValues = lineItems.map(item => [
    '', // Placeholders for customerName, estimateName, and date columns
    '',
    '',
    item.description,
    item.materials,
    item.engineeringHours,
    item.productionHours,
    item.finishHours,
    item.installationHours
  ]);

  if (lineItemValues.length > 0) {
    sheet.getRange(3, 1, lineItemValues.length, headers.length).setValues(lineItemValues);
  }

  return getSheetsData(); // Returns updated sheet data after adding the new sheet
};

export const deleteSheet = (sheetIndex) => {
  // Deletes the sheet at the specified index
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData(); // Returns updated sheet data after deletion
};

export const setActiveSheet = (sheetName) => {
  // Sets the specified sheet as the active sheet
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData(); // Returns updated sheet data (though no actual data change in this case)
};

export const createEstimateSheet = (estimateName, estimateData) => {
  // Function to create a new estimate sheet (implementation not provided)
  const newSheet = SpreadsheetApp.getActive().insertSheet(estimateName);
  // Add logic to populate the sheet with estimateData
  // ...
  return getSheetsData(); // Update sheet data after creation
};