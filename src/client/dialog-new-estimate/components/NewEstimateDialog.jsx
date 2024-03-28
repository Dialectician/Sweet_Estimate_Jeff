/*
 * Summary of Comments and Annotations:
 *
 * This component manages the overall state and functionality of the new estimate dialog.
 * It fetches sheet data from the server, handles sheet deletion, tracks the active sheet,
 * provides functions for submitting new sheets and updating the active sheet, and renders
 * a list of SheetButton components for displaying and interacting with sheets.
 *
 * This component relies on functions defined in `serverFunctions` (which interacts with
 * the server-side code in `sheets.js`) and other components like `FormInput` and `SheetButton`.
 */

import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // For animating sheet list transitions
import FormInput from './FormInput'; // Component for handling estimate form input
import SheetButton from './SheetButton'; // Component for displaying individual sheet buttons
import { serverFunctions } from '../../utils/serverFunctions'; // Helper functions for interacting with server-side code (sheets.js)

const NewEstimateDialog = () => {
  const [sheets, setSheets] = useState([]); // State for storing sheet data
  const [activeSheetData, setActiveSheetData] = useState(null); // State for storing the currently active sheet's data

  useEffect(() => {
    // Fetches sheet data from the server when the component mounts (sheets.js)
    serverFunctions.getSheetsData().then(setSheets).catch(alert);
  }, []);

  const deleteSheet = (sheetIndex) => {
    // Calls the server function to delete a sheet and updates the state (sheets.js)
    serverFunctions.deleteSheet(sheetIndex).then(setSheets).catch(alert);
  };

  const handleActiveSheetChange = (sheetName) => {
    // Finds the sheet data based on the name and updates the active sheet state
    const sheet = sheets.find((s) => s.name === sheetName);
    setActiveSheetData(sheet);
    serverFunctions.setActiveSheet(sheetName).catch(alert); // Also updates the active sheet on the server (sheets.js)
  };

  const submitNewSheet = async (formData) => {
    // Handles submitting a new sheet
    try {
      // Constructs the data object to be sent to the server
      const submitData = {
        customerName: formData.customer,
        estimateName: formData.estimateNumber,
        date: new Date().toDateString(),
        lineItems: formData.lineItems,
      };

      // Assuming sheetTitle is derived from formData (or you could directly use formData.estimateNumber)
      const sheetTitle = `${formData.customer}-${formData.estimateNumber}`;

      // Calls the server function to add a new sheet and updates the state with the response (sheets.js)
      const response = await serverFunctions.addSheet(sheetTitle, submitData);
      setSheets(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p><b>New Estimate</b></p>
      <p>Create a new Estimate. Click the red × next to the Estimate to delete it.</p>
      <FormInput submitNewSheet={submitNewSheet} activeSheetData={activeSheetData} /> {/* Passes functions and data to the FormInput component */}
      <TransitionGroup className="sheet-list">
        {/* Maps through the sheets and renders SheetButton components with appropriate props */}
        {sheets.map((sheet) => (
          <CSSTransition classNames="sheet" timeout={500} key={sheet.name}>
            <SheetButton
              sheetDetails={sheet}
              deleteSheet={() => deleteSheet(sheet.index)}
              setActiveSheet={() => handleActiveSheetChange(sheet.name)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default NewEstimateDialog;