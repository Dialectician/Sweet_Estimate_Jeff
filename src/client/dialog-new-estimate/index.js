import React from 'react';
import ReactDOM from 'react-dom';
import SheetEditor from './components/NewEstimateDialog';
import './styles.css';

const App = () => {
  return (
    <>
      <SheetEditor />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('index'));
