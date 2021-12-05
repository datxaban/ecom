import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import Footer from './components/mainpages/footer/Footer';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
            <div className="header_section">
              <Header/>
            </div>
            <div className="mainpage_section">
              <MainPages />
            </div>
            <div className="footer_section">
              <Footer/>
            </div>
        </div>
      </Router>
    </DataProvider>
  );

}

export default App;