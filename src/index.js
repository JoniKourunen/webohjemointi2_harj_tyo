import React from 'react';

import * as ReactDOMClient from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Koti from './Koti';
import Yhteystiedotmiddle  from './Yhteystiedotmiddle';
import Search from './Search';


ReactDOMClient.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Routes>
      <Route path="/" element={<App/>}>
        <Route path="Search" element={<Search/>}/>
        <Route path="Koti" element={<Koti/>}/>
        <Route path="Yhteystiedot" element={<Yhteystiedotmiddle/>}/>
        
    
    <Route path="*" element={<h1><b>Väärä reitti</b></h1>}/>
    </Route>
   </Routes>
      
   <App />
  
  </BrowserRouter>

,
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
