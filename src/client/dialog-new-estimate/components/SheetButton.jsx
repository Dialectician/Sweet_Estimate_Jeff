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
