import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ submitNewSheet, activeSheetData }) => {
  const [customer, setCustomer] = useState('');
  const [estimateNumber, setEstimateNumber] = useState('');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');
  const [engineeringHours, setEngineeringHours] = useState('');
  const [productionHours, setProductionHours] = useState('');
  const [finishHours, setFinishHours] = useState('');
  const [installationHours, setInstallationHours] = useState('');
  const [lineItems, setLineItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track edit mode

  useEffect(() => {
    if (activeSheetData) {
      setCustomer(activeSheetData.customer || '');
      setEstimateNumber(activeSheetData.estimateNumber || '');
      setLineItems(activeSheetData.lineItems || []);
    } else {
      setCustomer('');
      setEstimateNumber('');
      setLineItems([]);
    }
  }, [activeSheetData]);

  const handleInputChange = (setState) => (event) => setState(event.target.value);

  const handleAddOrUpdateLineItem = () => {
    const newItem = {
      description,
      materials,
      engineeringHours,
      productionHours,
      finishHours,
      installationHours,
    };

    if (editIndex >= 0) {
      // Update existing item
      const updatedItems = [...lineItems];
      updatedItems[editIndex] = newItem;
      setLineItems(updatedItems);
      setEditIndex(-1); // Exit edit mode
    } else {
      // Add new item
      setLineItems([...lineItems, newItem]);
    }

    // Clear inputs
    setDescription('');
    setMaterials('');
    setEngineeringHours('');
    setProductionHours('');
    setFinishHours('');
    setInstallationHours('');
  };

  const handleEditItem = (index) => {
    const item = lineItems[index];
    // Populate input fields with item data
    setDescription(item.description);
    setMaterials(item.materials);
    setEngineeringHours(item.engineeringHours);
    setProductionHours(item.productionHours);
    setFinishHours(item.finishHours);
    setInstallationHours(item.installationHours);
    setEditIndex(index); // Enter edit mode
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitNewSheet({
      customer,
      estimateNumber,
      lineItems,
    });
    // Reset form
    setCustomer('');
    setEstimateNumber('');
    setLineItems([]);
    setEditIndex(-1); // Ensure we're out of edit mode
  };

  return (
    <div className="container mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer and Estimate Number Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Input Fields */}
        </div>

        {/* Line Items Section */}
        <div className="border-t pt-4">
          {/* Line Item Inputs */}
          <button type="button" onClick={handleAddOrUpdateLineItem}>
            {editIndex >= 0 ? 'Update Line Item' : 'Add Line Item'}
          </button>
        </div>

        {/* List of Line Items */}
        <ul className="list-disc pl-5 space-y-2">
          {lineItems.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
              {/* Item details */}
              <button onClick={() => handleEditItem(index)}>Edit</button>
            </li>
          ))}
        </ul>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button type="submit" className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Submit Estimate
          </button>
        </div>
      </form>
    </div>
  );
};

FormInput.propTypes = {
  submitNewSheet: PropTypes.func.isRequired,
  activeSheetData: PropTypes.shape({
    customer: PropTypes.string,
    estimateNumber: PropTypes.string,
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      materials: PropTypes.string,
      engineeringHours: PropTypes.string,
      productionHours: PropTypes.string,
      finishHours: PropTypes.string,
      installationHours: PropTypes.string,
    })),
  }),
};

FormInput.defaultProps = {
  activeSheetData: null,
};

export default FormInput;

