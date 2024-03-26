//FormInput.tsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';


const FormInput = ({ submitNewSheet }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => setInputValue(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length === 0) return;

    submitNewSheet(inputValue);
    setInputValue('');
  };

  return (
    <form className="flex w-full mx-auto items-center" onSubmit={handleSubmit}>
      <div className="grow pr-2 py-1">
        <input
          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 transition-colors duration-200 ease-in-out"
          onChange={handleChange}
          value={inputValue}
          placeholder="New sheet Name"
        />
      </div>
      <button
        className="btn btn-add-sheet" // Using classes from styles.css
        type="submit"
      >
        Add Sheet
      </button>
    </form>
  );
};

export default FormInput;

FormInput.propTypes = {
  submitNewSheet: PropTypes.func,
};

//NewEstimateDialog.jsx
import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const NewEstimateDialog = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Call a server global function here and handle the response with .then() and .catch()
    serverFunctions.getSheetsData().then(setNames).catch(alert);
  }, []);

  const deleteSheet = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setNames).catch(alert);
  };

  const setActiveSheet = (sheetName) => {
    serverFunctions.setActiveSheet(sheetName).then(setNames).catch(alert);
  };

  // You can also use async/await notation for server calls with our server wrapper.
  // (This does the same thing as .then().catch() in the above handlers.)
  const submitNewSheet = async (newSheetName) => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <div>
      <p>
        <b>New Estimate</b>
      </p>
      <p>
        Create a new Estimate
        red &times; next to the sheet name to delete it.
      </p>
      <FormInput submitNewSheet={submitNewSheet} />
      <TransitionGroup className="sheet-list">
        {names.length > 0 &&
          names.map((name) => (
            <CSSTransition
              classNames="sheetNames"
              timeout={500}
              key={name.name}
            >
              <SheetButton
                sheetDetails={name}
                deleteSheet={deleteSheet}
                setActiveSheet={setActiveSheet}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default NewEstimateDialog;


//SheetButton.jsx
import React from 'react';
import PropTypes from 'prop-types';


const SheetButton = ({ sheetDetails, deleteSheet, setActiveSheet }) => {
  const { index, name, isActive } = sheetDetails;

  return (
    <div className={`sheet-button ${isActive ? 'active' : ''}`}>
      <button className="btn" onClick={() => setActiveSheet(name)}>
        {name}
      </button>
      <button className="btn delete" onClick={() => deleteSheet(index)}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times"
          className="w-3 ml-3"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

SheetButton.propTypes = {
  sheetDetails: PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  deleteSheet: PropTypes.func.isRequired,
  setActiveSheet: PropTypes.func.isRequired,
};

export default SheetButton;
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

export const addSheet = (sheetTitle) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
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
//styles.css


@tailwind base;
@tailwind components;
@tailwind utilities;

/*
  CSSTransitionGroup styling
*/

/* Animation for entering elements */
.sheetNames-enter,
.sheetNames-appear {
  opacity: 0;
}

.sheetNames-enter.sheetNames-enter-active,
.sheetNames-appear.sheetNames-appear-active {
  opacity: 1;
  transition: opacity 300ms ease-in-out;
}

/* Animation for exiting elements */
.sheetNames-exit {
  opacity: 1;
}

.sheetNames-exit.sheetNames-exit-active {
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}
/* CSS for SheetButton component */
.sheet-button {
  margin-top: 1.25rem; /* mt-5 */
  padding: 0.75rem 0; /* py-3 */
  width: 50%; /* w-1/2 */
  justify-content: center; /* justify-center */
  border-bottom-width: 2px; /* border-b-2 */
  font-weight: 500; /* font-medium */
  display: inline-flex; /* inline-flex */
  line-height: 1; /* leading-none */
}

.sheet-button:hover {
  border-color: #f0e2e9; /* border-gray-200 */
  color: #375137; /* text-gray-900 */
  cursor: pointer; /* hover:text-gray-900 */
}

.sheet-button.active {
  background-color: #f3f4f6; /* bg-gray-100 */
  border-color: #cd656e; /* border-indigo-500 */
  color: #6574cd; /* text-indigo-500 */
  border-radius: 0.25rem 0.25rem 0 0; /* rounded-t */
}

.sheet-button .btn {
  background-color: transparent; /* bg-transparent */
  border: none;
  outline: none; /* focus:outline-none */
}

.sheet-button .btn.delete {
  color: #dc262f; /* text-red-500 */
}
/* styles.css */

.btn {
  /* Common button styles */
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.btn-add-sheet {
  /* Button specific to add sheet */
  background-color: #4f46e5; /* Example background color */
  color: #fff; /* Example text color */
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.btn-add-sheet:hover {
  background-color: #38cac3; /* Example hover background color */
}
