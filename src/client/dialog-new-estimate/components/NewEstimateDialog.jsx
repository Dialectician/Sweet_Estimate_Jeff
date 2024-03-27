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

  const submitNewSheet = async (sheetData) => {
    try {
      const newSheetTitle = `${sheetData.customer}-${sheetData.estimateNumber}`;
      const response = await serverFunctions.addSheet(newSheetTitle, sheetData);
      setSheets(response);
      // Update the active sheet data with new sheet's data
      setActiveSheetData({ name: newSheetTitle, ...sheetData });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <p><b>New Estimate</b></p>
      <p>Create a new Estimate. Click the red &times; next to the sheet name to delete it.</p>
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
