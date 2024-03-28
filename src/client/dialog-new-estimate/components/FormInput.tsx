import React, { useState, useEffect, useMemo } from 'react';
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
  const [engineeringCost, setEngineeringCost] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [finishCost, setFinishCost] = useState('');
  const [installationCost, setInstallationCost] = useState('');
  const [lineItems, setLineItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    if (activeSheetData) {
      // Initialize state with activeSheetData if available
      setCustomer(activeSheetData.customer || '');
      setEstimateNumber(activeSheetData.estimateNumber || '');
      setDescription(activeSheetData.description || '');
      setMaterials(activeSheetData.materials || '');
      setEngineeringHours(activeSheetData.engineeringHours || '');
      setProductionHours(activeSheetData.productionHours || '');
      setFinishHours(activeSheetData.finishHours || '');
      setInstallationHours(activeSheetData.installationHours || '');
      setEngineeringCost(activeSheetData.engineeringCost || '');
      setProductionCost(activeSheetData.productionCost || '');
      setFinishCost(activeSheetData.finishCost || '');
      setInstallationCost(activeSheetData.installationCost || '');
      setLineItems(activeSheetData.lineItems || []);
    } else {
      resetForm();
    }
  }, [activeSheetData]);

  const handleInputChange = (setter, costSetter = null) => (event) => {
    setter(event.target.value);
    if (costSetter) {
      const hours = parseFloat(event.target.value) || 0;
      costSetter(hours * 100); // Assuming $100 per hour as cost
    }
  };

  const handleAddOrUpdateLineItem = () => {
    const newItem = {
      description,
      materials: parseFloat(materials),
      engineeringHours: parseFloat(engineeringHours),
      productionHours: parseFloat(productionHours),
      finishHours: parseFloat(finishHours),
      installationHours: parseFloat(installationHours),
      engineeringCost: parseFloat(engineeringHours) * 100, // Assuming cost calculations are based on a fixed rate
      productionCost: parseFloat(productionHours) * 100,
      finishCost: parseFloat(finishHours) * 100,
      installationCost: parseFloat(installationHours) * 100,
      totalCost: (parseFloat(materials) || 0) + ((parseFloat(engineeringHours) + parseFloat(productionHours) + parseFloat(finishHours) + parseFloat(installationHours)) * 100)
    };

    if (editIndex >= 0) {
      setLineItems(lineItems.map((item, index) => (index === editIndex ? newItem : item)));
      setEditIndex(-1);
    } else {
      setLineItems([...lineItems, newItem]);
    }

    // Clear inputs after adding/updating
    resetLineItemFields();
  };

  const handleEditClick = (index) => {
    const item = lineItems[index];
    setDescription(item.description);
    setMaterials(item.materials.toString());
    setEngineeringHours(item.engineeringHours.toString());
    setProductionHours(item.productionHours.toString());
    setFinishHours(item.finishHours.toString());
    setInstallationHours(item.installationHours.toString());
    setEngineeringCost(item.engineeringCost.toString());
    setProductionCost(item.productionCost.toString());
    setFinishCost(item.finishCost.toString());
    setInstallationCost(item.installationCost.toString());
    setEditIndex(index);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!customer || !estimateNumber) {
      alert("Customer and Estimate Number are required.");
      return;
    }
    submitNewSheet({
      customer,
      estimateNumber,
      lineItems,
    });
    resetForm();
  };

  const resetForm = () => {
    setCustomer('');
    setEstimateNumber('');
    resetLineItemFields();
    setLineItems([]);
    setEditIndex(-1);
  };

  const resetLineItemFields = () => {
    setDescription('');
    setMaterials('');
    setEngineeringHours('');
    setProductionHours('');
    setFinishHours('');
    setInstallationHours('');
    setEngineeringCost('');
    setProductionCost('');
    setFinishCost('');
    setInstallationCost('');
  };

  const calculateTotalCost = useMemo(() => lineItems.reduce((acc, item) => acc + item.totalCost, 0), [lineItems]);

  return (
    <div className="container mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg max-w-6xl h-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">New Estimate</h1>
        <div className="text-right mb-4">
          <h2 className="text-lg font-semibold">Running Total: ${calculateTotalCost.toFixed(2)}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Field */}
            <div className="relative form-group">
              <input
                id="customer"
                type="text"
                value={customer}
                onChange={handleInputChange(setCustomer)}
                onFocus={() => {}}
                onBlur={() => {}}
                className="peer mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
                placeholder="Customer"
                required
              />
              <label
                htmlFor="customer"
                className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none"
              >
                Customer
              </label>
            </div>
        

          {/* Estimate Number Field */}
          <div className="relative form-group">
            <input
              id="estimateNumber"
              type="text"
              value={estimateNumber}
              onChange={handleInputChange(setEstimateNumber)}
              className="peer mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
              placeholder="Estimate Number"
              required
            />
            <label
              htmlFor="estimateNumber"
              className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                     peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Estimate Number
            </label>
          </div>
        </div>

    

        {/* Line Items Section */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Line Items</h2>
          <div className="space-y-4">
            {/* Line Item Description Field */}
            <div className="relative">
              <input
                type="text"
                value={description}
                onChange={handleInputChange(setDescription)}
                className="peer mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
                placeholder="Description"
                required
              />
              <label
                htmlFor="description"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none"
              >
                Description
              </label>
            </div>
            {/* Materials Field */}
            <div className="relative mt-8 mb-8">
              <input
                type="number"
                value={materials}
                onChange={handleInputChange(setMaterials)}
                className="peer mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
                placeholder="Materials ($)"
                required
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none"
              >
                Materials ($)
              </label>
            </div>

            {/* Engineering Hours Field */}
            <div className="relative">
              <input
                type="number"
                value={engineeringHours}
                onChange={handleInputChange(setEngineeringHours, setEngineeringCost)}
                className="peer mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
                placeholder="Engineering Hours pointer-events-none"
                required
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none"
              >
                Engineering Hours
              </label>
            </div>

            {/* Production Hours Field */}
            <div className="relative">
              <input
                type="number"
                value={productionHours}
                onChange={handleInputChange(setProductionHours, setProductionCost)}
                className="peer mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
                placeholder="Production Hours pointer-events-none"
                required
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none"
              >
                Production Hours
              </label>
            </div>

            {/* Finish Hours Field */}
            <div className="relative mb-4">
              <input
                type="number"
                value={finishHours}
                onChange={handleInputChange(setFinishHours, setFinishCost)}
                className="peer mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
                placeholder="Finish Hours"
                required
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none"
              >
                Finish Hours
              </label>
            </div>

            {/* Installation Hours Field */}
            <div className="relative mb-44">
              <input
                type="number"
                value={installationHours}
                onChange={handleInputChange(setInstallationHours, setInstallationCost)}
                className="peer mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500
                 focus:border-indigo-500 placeholder-transparent"
                placeholder="Installation Hours"
                required
                style={{ width: `${"Installation Hours".length}ch` }}
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5
                  peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none"
              >
                Installation Hours
              </label>
            </div>

            {/* Add Line Item Button */}
            <button
              type="button"
              onClick={handleAddOrUpdateLineItem}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              {editIndex >= 0 ? 'Update Line Item' : 'Add Line Item'}
            </button>

            {/* Add Line Item Button */}
            <button
              type="button"
              onClick={handleAddOrUpdateLineItem}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editIndex >= 0 ? 'Update Line Item' : 'Add Line Item'}
            </button>
          </div>
        </div>

        {/* Line Items List */}
        <ul className="list-disc pl-5 space-y-2">
          {lineItems.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
              <div>
                {/* Display Line Item Details */}
                <p>Description: {item.description}</p>
                <p>Materials: ${item.materials.toFixed(2)}</p>
                <p>Total Cost: ${item.totalCost.toFixed(2)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEditClick(index);
                }}
                className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            disabled={!customer || !estimateNumber}
          >
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
    description: PropTypes.string,
    materials: PropTypes.number,
    engineeringHours: PropTypes.number,
    productionHours: PropTypes.number,
    finishHours: PropTypes.number,
    installationHours: PropTypes.number,
    engineeringCost: PropTypes.number,
    productionCost: PropTypes.number,
    finishCost: PropTypes.number,
    installationCost: PropTypes.number,
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      materials: PropTypes.number.isRequired,
      engineeringHours: PropTypes.number.isRequired,
      productionHours: PropTypes.number.isRequired,
      finishHours: PropTypes.number.isRequired,
      installationHours: PropTypes.number.isRequired,
      engineeringCost: PropTypes.number.isRequired,
      productionCost: PropTypes.number.isRequired,
      finishCost: PropTypes.number.isRequired,
      installationCost: PropTypes.number.isRequired,
      totalCost: PropTypes.number.isRequired,
    })),
  }),
};

export default FormInput;
