import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Country from './Components/Country';
import Countries from './Components/Countries';
import NotFound from './NotFound';
import Controls from './Components/Controls';

function App() {
  return (
    <Router>
      <Controls/>
      <Routes>
        <Route path="/" element={<Countries/>}/>
        <Route path="/:countryID" element={<Country/>}/>
        <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;
