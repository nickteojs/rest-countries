import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Country from './Components/Country';
import Countries from './Components/Countries';
import NotFound from './NotFound';
import Navbar from './Components/Navbar';
import { CountryProvider } from './Components/CountryContext';

function App() {
  return (
    <CountryProvider>
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Countries/>}/>
            <Route path="/:countryID" element={<Country/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </Router>
    </CountryProvider>
  );
}

export default App;
