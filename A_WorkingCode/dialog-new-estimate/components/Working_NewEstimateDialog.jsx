import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';
import { serverFunctions } from '../../utils/serverFunctions';

const NewEstimateDialog = () => {
  const [sheets, setSheets] = useState([]);
  const [activeSheetData, setActiveSheetData] = useState(null);

  useEffect(() => {
    serverFunctions.getSheetsData().then(setSheets).catch(alert);
  }, []);

  const deleteSheet = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setSheets).catch(alert);
  };

  const handleActiveSheetChange = (sheetName) => {
    const sheet = sheets.find((s) => s.name === sheetName);
    setActiveSheetData(sheet); // Update active sheet data
    serverFunctions.setActiveSheet(sheetName).catch(alert);
  };

  // Updated submitNewSheet function
  const submitNewSheet = async (formData) => {
    try {
      // Using formData to construct the data object for submission
      const submitData = {
        customerName: formData.customer, // Adjusted to formData.customer
        estimateName: formData.estimateNumber, // Adjusted to formData.estimateNumber
        date: new Date().toDateString(), // Kept as is, adjust as necessary
        lineItems: formData.lineItems // Adjusted to formData.lineItems
      };

      // Assuming sheetTitle is derived from formData (or you could directly use formData.estimateNumber)
      const sheetTitle = `${formData.customer}-${formData.estimateNumber}`;
      
      const response = await serverFunctions.addSheet(sheetTitle, submitData);
      setSheets(response); // Assuming response includes the updated sheets list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p><b>New Estimate</b></p>
      <p>Create a new Estimate. Click the red &times; next to the Estimate to delete it.</p>
      <FormInput submitNewSheet={submitNewSheet} activeSheetData={activeSheetData} />
      <TransitionGroup className="sheet-list">
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
