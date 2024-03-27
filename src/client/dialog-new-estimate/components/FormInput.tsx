import React, { useState, useEffect } from 'react'; // Importing necessary modules_Sweet
import PropTypes from 'prop-types'; // Importing PropTypes for type checking of props

// FormInput component definition
const FormInput = ({ submitNewSheet, activeSheetData }) => {
  // State variables for form inputs and line items
  const [customer, setCustomer] = useState('');
  const [estimateNumber, setEstimateNumber] = useState('');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');
  const [engineeringHours, setEngineeringHours] = useState('');
  const [productionHours, setProductionHours] = useState('');
  const [finishHours, setFinishHours] = useState('');
  const [installationHours, setInstallationHours] = useState('');
  const [lineItems, setLineItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // State to track edit mode

  // useEffect hook to update state when activeSheetData changes
  useEffect(() => {
    if (activeSheetData) {
      // Populate form inputs and line items with data from activeSheetData
      setCustomer(activeSheetData.customer || '');
      setEstimateNumber(activeSheetData.estimateNumber || '');
      setLineItems(activeSheetData.lineItems || []);
    } else {
      // Reset form inputs and line items when activeSheetData is null
      setCustomer('');
      setEstimateNumber('');
      resetLineItemInputs();
      setLineItems([]);
      setEditIndex(-1);
    }
  }, [activeSheetData]);

  // Handler function to update state for input fields
  const handleInputChange = (setter) => (event) => setter(event.target.value);

  // Handler function to add or update a line item
  const handleAddOrUpdateLineItem = () => {
    const newItem = {
      description,
      materials,
      engineeringHours,
      productionHours,
      finishHours,
      installationHours,
    };
  
    // Create a new array with the updated item or add a new one
    const updatedLineItems = editIndex >= 0
      ? lineItems.map((item, index) => index === editIndex ? newItem : item)
      : [...lineItems, newItem];
  
    setLineItems(updatedLineItems); // Update the state with the new array
    setEditIndex(-1); // Reset edit index
    resetLineItemInputs(); // Clear the input fields
  };

  // Handler function to populate input fields with data of the selected line item for editing
  const handleEditClick = (event, index) => {
    event.preventDefault(); // Prevent form submission
    const item = lineItems[index];
    // Set input fields with data of the selected line item
    setDescription(item.description);
    setMaterials(item.materials);
    setEngineeringHours(item.engineeringHours);
    setProductionHours(item.productionHours);
    setFinishHours(item.finishHours);
    setInstallationHours(item.installationHours);
    // Set edit index
    setEditIndex(index);
  };

  // Function to reset input fields
  const resetLineItemInputs = () => {
    setDescription('');
    setMaterials('');
    setEngineeringHours('');
    setProductionHours('');
    setFinishHours('');
    setInstallationHours('');
  };

  // Handler function for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit new sheet data
    submitNewSheet({
      customer,
      estimateNumber,
      lineItems,
    });
    // Reset input fields and line items after submission
    setCustomer('');
    setEstimateNumber('');
    setLineItems([]);
  };

  // JSX structure for the form
  return (
    <div className="container mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">New Estimate</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Customer Input */}
          <div className="form-group">
            <label htmlFor="customer" className="text-gray-600 font-medium">Customer</label>
            <input type="text" id="customer" value={customer} onChange={handleInputChange(setCustomer)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          {/* Estimate Number Input */}
          <div className="form-group">
            <label htmlFor="estimateNumber" className="text-gray-600 font-medium">Estimate Number</label>
            <input type="text" id="estimateNumber" value={estimateNumber} onChange={handleInputChange(setEstimateNumber)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Line Items</h2>
          <div className="space-y-4">
            {/* Input fields for line items */}
            <input type="text" placeholder="Description" value={description} onChange={handleInputChange(setDescription)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <input type="number" placeholder="Materials ($)" value={materials} onChange={handleInputChange(setMaterials)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <input type="number" placeholder="Engineering Hours" value={engineeringHours} onChange={handleInputChange(setEngineeringHours)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <input type="number" placeholder="Production Hours" value={productionHours} onChange={handleInputChange(setProductionHours)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <input type="number" placeholder="Finish Hours" value={finishHours} onChange={handleInputChange(setFinishHours)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <input type="number" placeholder="Installation Hours" value={installationHours} onChange={handleInputChange(setInstallationHours)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            {/* Button to add or update line item */}
            <button type="button" onClick={handleAddOrUpdateLineItem} className="btn btn-add-line-item">
              {editIndex >= 0 ? 'Update Line Item' : 'Add Line Item'}
            </button>
          </div>
        </div>

        {/* List of line items */}
        <ul className="list-disc pl-5 space-y-2">
          {lineItems.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
             
             <div>
                <p>Description: {item.description}</p>
                <p>Materials: ${item.materials}</p>
                <p>Engineering Hours: {item.engineeringHours}</p>
                <p>Production Hours: {item.productionHours}</p>
                <p>Finish Hours: {item.finishHours}</p>
                <p>Installation Hours: {item.installationHours}</p>
              </div>
              <div>
                <button onClick={(e) => handleEditClick(e, index)} className="btn mr-2">Edit</button>
                {/* Include a Delete button here if necessary */}
              </div>
            </li>
          ))}
        </ul>

        {/* Submit button */}
        <div className="flex justify-center mt-8">
          <button 
            type="submit" 
            className={`btn btn-add-sheet ${!customer || !estimateNumber ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!customer || !estimateNumber} // Disable the button if conditions are not met
          >
            Submit Estimate
          </button>
        </div>
      </form>
    </div>
  );
};

// PropTypes validation for FormInput component
FormInput.propTypes = {
  submitNewSheet: PropTypes.func.isRequired,
  activeSheetData: PropTypes.shape({
    customer: PropTypes.string,
    estimateNumber: PropTypes.string,
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      materials: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      engineeringHours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      productionHours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      finishHours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      installationHours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
  }),
};

// Default props for FormInput component
FormInput.defaultProps = {
  activeSheetData: null,
};

export default FormInput;
