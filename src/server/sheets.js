//sheet.js (server)
const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
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
  const { customerName, estimateName, date, lineItems } = data;

  // Ensure a sheet is created only if required data is present
  if (!customerName || !estimateName || !date || !Array.isArray(lineItems)) {
    throw new Error('Missing required data for creating a sheet.');
  }

  const sheet = SpreadsheetApp.getActive().insertSheet(sheetTitle);
  const headers = ['Customer Name', 'Estimate Name', 'Date', 'Description', 'Materials', 'Engineering Hours', 'Production Hours', 'Finish Hours', 'Installation Hours'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Add customer info to the second row
  const customerInfo = [customerName, estimateName, date, '', '', '', '', '', ''];
  sheet.getRange(2, 1, 1, customerInfo.length).setValues([customerInfo]);

  // Starting from the third row, add line items
  const lineItemValues = lineItems.map(item => [
    '', // These are placeholders for customerName, estimateName, and date columns
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

  return getSheetsData();
};


export const deleteSheet = (sheetIndex) => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = (sheetName) => {
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData();
};

export const createEstimateSheet = (estimateName, estimateData) => {
  const newSheet = SpreadsheetApp.getActive().insertSheet(estimateName);
  // Add logic to populate the sheet with estimateData
  // ...
  return getSheetsData(); // Update sheet data after creation
};
