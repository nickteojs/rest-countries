import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Country from './Components/Country';
import Countries from './Components/Countries';
import NotFound from './NotFound';
import Navbar from './Components/Navbar';
import { CountryProvider } from './Components/CountryContext';
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CountryProvider>
        <Router>
            <Navbar/>
            {/* <ReactQueryDevtools/> */}
            <Routes>
              <Route path="/" element={<Countries/>}/>
              <Route path="/:countryID" element={<Country/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
      </CountryProvider>
    </QueryClientProvider>
  );
}

export default App;
