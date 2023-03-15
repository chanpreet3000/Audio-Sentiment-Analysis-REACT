import React from 'react';
import './App.css'
import Footer from './components/Footer/Footer.component';
import MainSection from './components/MainSection/MainSection.component';
import RecordSection from './components/RecordSection/RecordSection.component';

function App() {
  return (
    <div className='main'>
      <div className='container'>
        <MainSection />
        <RecordSection />
        <Footer />
      </div>
    </div>
  );
}
export default App;
