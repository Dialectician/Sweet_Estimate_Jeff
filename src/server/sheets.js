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

  const sheet = SpreadsheetApp.getActive().insertSheet(sheetTitle);
  const headers = ['Customer Name', 'Estimate Name', 'Date', 'Description', 'Materials', 'Engineering Hours', 'Production Hours', 'Finish Hours', 'Installation Hours'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (customerName && estimateName && date) {
    sheet.appendRow([customerName, estimateName, date]); // Add customer info to the sheet

    if (lineItems && lineItems.length > 0) {
      lineItems.forEach(item => {
        const { description, materials, engineeringHours, productionHours, finishHours, installationHours } = item;
        sheet.appendRow([description, materials, engineeringHours, productionHours, finishHours, installationHours]);
      });
    }
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
