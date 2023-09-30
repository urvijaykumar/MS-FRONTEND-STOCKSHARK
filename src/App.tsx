import { Outlet } from 'react-router';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React from 'react';




const App = () => {
 
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
