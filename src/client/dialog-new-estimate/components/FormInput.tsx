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

  useEffect(() => {
    if (activeSheetData) {
      setCustomer(activeSheetData.customer || '');
      setEstimateNumber(activeSheetData.estimateNumber || '');
      setLineItems(activeSheetData.lineItems || []);
    } else {
      // Reset the form if there is no active sheet data
      setCustomer('');
      setEstimateNumber('');
      setLineItems([]);
    }
  }, [activeSheetData]);

  const handleInputChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleAddLineItem = () => {
    const newItem = {
      description,
      materials,
      engineeringHours,
      productionHours,
      finishHours,
      installationHours
    };
    setLineItems([...lineItems, newItem]);
    setDescription('');
    setMaterials('');
    setEngineeringHours('');
    setProductionHours('');
    setFinishHours('');
    setInstallationHours('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitNewSheet({
      customer,
      estimateNumber,
      lineItems
    });
    setCustomer('');
    setEstimateNumber('');
    setLineItems([]);
  };

  return (
    <div className="container mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">New Estimate</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="customer" className="text-gray-600 font-medium">Customer</label>
            <input type="text" id="customer" value={customer} onChange={handleInputChange(setCustomer)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="form-group">
            <label htmlFor="estimateNumber" className="text-gray-600 font-medium">Estimate Number</label>
            <input type="text" id="estimateNumber" value={estimateNumber} onChange={handleInputChange(setEstimateNumber)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Line Items</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Description" value={description} onChange={handleInputChange(setDescription)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input type="number" placeholder="Materials ($)" value={materials} onChange={handleInputChange(setMaterials)} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="number" placeholder="Engineering Hours" value={engineeringHours} onChange={handleInputChange(setEngineeringHours)} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="number" placeholder="Production Hours" value={productionHours} onChange={handleInputChange(setProductionHours)} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="number" placeholder="Finish Hours" value={finishHours} onChange={handleInputChange(setFinishHours)} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-
500" />
<input type="number" placeholder="Installation Hours" value={installationHours} onChange={handleInputChange(setInstallationHours)} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
</div>
<button type="button" onClick={handleAddLineItem} className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Add Line Item</button>
</div>
</div>

<ul className="list-disc pl-5 space-y-2">
{lineItems.map((item, index) => (
<li key={index} className="bg-gray-100 p-3 rounded-md">
<p>Description: <span className="font-normal">{item.description}</span></p>
<p>Materials: <span className="font-normal">{item.materials}</span></p>
<p>Engineering Hours: <span className="font-normal">{item.engineeringHours}</span></p>
<p>Production Hours: <span className="font-normal">{item.productionHours}</span></p>
<p>Finish Hours: <span className="font-normal">{item.finishHours}</span></p>
<p>Installation Hours: <span className="font-normal">{item.installationHours}</span></p>
</li>
))}
</ul>

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
}))
}),
};

FormInput.defaultProps = {
activeSheetData: null,
};

export default FormInput;
