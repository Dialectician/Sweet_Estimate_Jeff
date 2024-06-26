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
      setCustomer(activeSheetData.customer || '');
      setEstimateNumber(activeSheetData.estimateNumber || '');
      setLineItems(activeSheetData.lineItems || []);
    } else {
      setCustomer('');
      setEstimateNumber('');
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
      setLineItems([]);
      setEditIndex(-1);
    }
  }, [activeSheetData]);

  const handleInputChange = (setter, costSetter?) => (event) => {
    setter(event.target.value);
    if (costSetter) {
      const hours = parseFloat(event.target.value) || 0;
      costSetter(hours * 100); // Assuming $100 per hour
    }
  };

  const calculateTotalCost = (item) => {
    const materialsCost = parseFloat(item.materials) || 0;
    const totalHours = (parseFloat(item.engineeringHours) || 0) +
      (parseFloat(item.productionHours) || 0) +
      (parseFloat(item.finishHours) || 0) +
      (parseFloat(item.installationHours) || 0);
    return materialsCost + totalHours * 100; // Your rate
  };

  const handleAddOrUpdateLineItem = () => {
    const materialsCost = parseFloat(materials) || 0;
    const engHours = parseFloat(engineeringHours) || 0;
    const prodHours = parseFloat(productionHours) || 0;
    const finHours = parseFloat(finishHours) || 0;
    const instHours = parseFloat(installationHours) || 0;

    const engCost = engHours * 100;
    const prodCost = prodHours * 100;
    const finCost = finHours * 100;
    const instCost = instHours * 100;

    const newItem = {
      description,
      materials: materialsCost,
      engineeringHours: engHours,
      productionHours: prodHours,
      finishHours: finHours,
      installationHours: instHours,
      engineeringCost: engCost,
      productionCost: prodCost,
      finishCost: finCost,
      installationCost: instCost,
      totalCost: calculateTotalCost({
        materials: materialsCost.toString(),
        engineeringHours: engHours.toString(),
        productionHours: prodHours.toString(),
        finishHours: finHours.toString(),
        installationHours: instHours.toString(),
      }),
    };

    const updatedLineItems = editIndex >= 0
      ? lineItems.map((item, index) => index === editIndex ? newItem : item)
      : [...lineItems, newItem];

    setLineItems(updatedLineItems);
    setEditIndex(-1);
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

  const handleEditClick = (index) => {
    const item = lineItems[index];
    setDescription(item.description);
    setMaterials(item.materials);
    setEngineeringHours(item.engineeringHours);
    setProductionHours(item.productionHours);
    setFinishHours(item.finishHours);
    setInstallationHours(item.installationHours);
    setEngineeringCost(item.engineeringCost);
    setProductionCost(item.productionCost);
    setFinishCost(item.finishCost);
    setInstallationCost(item.installationCost);
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
    setCustomer('');
    setEstimateNumber('');
    setLineItems([]);
  };

  const runningTotal = useMemo(() => lineItems.reduce((acc, item) => acc + item.totalCost, 0), [lineItems]);

  return (
    <div className="container mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">New Estimate</h1>
        <div className="text-right mb-4">
          <h2 className="text-lg font-semibold">Running Total: ${runningTotal.toFixed(2)}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="customer" className="text-gray-600 font-medium">Customer</label>
            <input
              type="text"
              id="customer"
              value={customer}
              onChange={handleInputChange(setCustomer)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter customer name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="estimateNumber" className="text-gray-600 font-medium">Estimate Number</label>
            <input
              type="text"
              id="estimateNumber"
              value={estimateNumber}
              onChange={handleInputChange(setEstimateNumber)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter estimate number"
            />
          </div>
        </div>
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Line Items</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={handleInputChange(setDescription)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="Materials ($)"
              value={materials}
              onChange={handleInputChange(setMaterials)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Engineering Hours"
                value={engineeringHours}
                onChange={handleInputChange(setEngineeringHours, setEngineeringCost)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Engineering Cost"
                value={engineeringCost}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Production Hours"
                value={productionHours}
                onChange={handleInputChange(setProductionHours, setProductionCost)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Production Cost"
                value={productionCost}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Finish Hours"
                value={finishHours}
                onChange={handleInputChange(setFinishHours, setFinishCost)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Finish Cost"
                value={finishCost}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Installation Hours"
                value={installationHours}
                onChange={handleInputChange(setInstallationHours, setInstallationCost)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Installation Cost"
                value={installationCost}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={handleAddOrUpdateLineItem}
              className="btn btn-add-line-item"
            >
              {editIndex >= 0 ? 'Update Line Item' : 'Add Line Item'}
            </button>
          </div>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {lineItems.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
              <div>
                <p>Description: {item.description}</p>
                <p>Materials: ${item.materials.toFixed(2)}</p>
                <p>Total Cost: ${item.totalCost.toFixed(2)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEditClick(index);
                }}
                className="btn mr-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className={`btn btn-add-sheet ${!customer || !estimateNumber ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      materials: PropTypes.number.isRequired,
      engineeringHours: PropTypes.number.isRequired,
      productionHours: PropTypes.number.isRequired,
      finishHours: PropTypes.number.isRequired,
      installationHours: PropTypes.number.isRequired,
      totalCost: PropTypes.number.isRequired,
    })),
  }),
};

FormInput.defaultProps = {
  activeSheetData: null,
};

export default FormInput;