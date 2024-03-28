/*
 * Summary of Comments and Annotations:
 *
 * This file contains functions for creating the user interface (UI) elements of the web app,
 * including the menu and dialogs. It uses Google Apps Script's UI service to interact with
 * the spreadsheet's UI.
 */

export const onOpen = () => {
  // Creates a custom menu when the spreadsheet is opened
  const menu = SpreadsheetApp.getUi()
    .createMenu('Sweet Estimates') // Menu title
    .addItem('Sheet Editor (Bootstrap)', 'openDialogBootstrap') // Menu item to open the Bootstrap dialog
    .addItem('Sheet Editor (MUI)', 'openDialogMUI') // Menu item to open the MUI dialog
    .addItem('Sheet Editor (Tailwind CSS)', 'openDialogTailwindCSS') // Menu item to open the Tailwind CSS dialog
    .addItem('About me', 'openAboutSidebar') // Menu item to open the About sidebar
    .addItem('New Estimate (test)', 'openDialogNewEstimate'); // Menu item to open the New Estimate dialog

  menu.addToUi(); // Adds the menu to the spreadsheet's UI
};

export const openDialogBootstrap = () => {
  // Opens the Bootstrap dialog
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap') // Creates HTML output from the specified file
    .setWidth(600) // Sets dialog width
    .setHeight(600); // Sets dialog height
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Bootstrap)'); // Shows the dialog
};

export const openDialogMUI = () => {
  // Opens the MUI dialog
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-mui')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (MUI)');
};

export const openDialogTailwindCSS = () => {
  // Opens the Tailwind CSS dialog
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-tailwindcss')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Tailwind CSS)');
};

export const openAboutSidebar = () => {
  // Opens the About sidebar
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SpreadsheetApp.getUi().showSidebar(html);
};

export const openDialogNewEstimate = () => {
  // Opens the New Estimate dialog
  const html = HtmlService.createHtmlOutputFromFile('dialog-new-estimate')
    .setWidth(1200) // Adjust width as needed
    .setHeight(1200); // Adjust height as needed
  SpreadsheetApp.getUi().showModalDialog(html, 'New Estimate');
};