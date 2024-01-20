import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Asteroid from './pages/Asteroid';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path="/asteroid" element={<Asteroid />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
