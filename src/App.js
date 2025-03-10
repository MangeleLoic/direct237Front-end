import React from 'react';
import MyNavBar from './Components/MyNavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Contact from './Components/Contact';
import MyFooter from './Components/MyFooter';

function App() {
  return (
    <div>
      <MyNavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/aboutUs" element={<Contact />} />
        
      </Routes> 
      <MyFooter />
     
    </div>
  );
}

export default App;
