import React from 'react';
import './App.css'
import Footer from './components/Footer/Footer.component';
import MainSection from './components/MainSection/MainSection.component';
import Navbar from './components/Navbar/Navbar.component';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About/About.component';
import RecordSection from './components/RecordSection/RecordSection.component';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={
          <div className='main'>
            <div className='container'>
              <Navbar />
              <MainSection />
              <RecordSection />
              <Footer />
            </div>
          </div>
        } />
        <Route path="/about" element={
          <About />
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
