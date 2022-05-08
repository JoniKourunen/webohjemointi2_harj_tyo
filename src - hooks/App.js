import React, { useState } from 'react';
import './App.css';
import Henkilot from './Henkilot';
import ColorContext from './ColorContext';
import ErrorBoundary from './ErrorBoundary';


function App() {
  const [color, setColor] = useState("hotpink");


  return (
    <ErrorBoundary>
      <ColorContext.Provider value={{ color, setColor }}>
        <div className="App">
          <header className="App-header">
            <Henkilot info="Tämä tulee app:sta" />
          </header>
        </div>
      </ColorContext.Provider>
    </ErrorBoundary>
  );
}

export default App;

