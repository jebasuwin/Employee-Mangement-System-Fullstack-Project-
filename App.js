// import logo from './logo.svg';
import './App.css';
// import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ListEmployeeComponents from './components/ListEmployeeComponents';
import HeaderComponents from './components/HeaderComponents';
import FooterComponents from './components/FooterComponents';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        
          <HeaderComponents/>
            <div className="container">
              <Routes> 
                <Route path="/" exact element={<ListEmployeeComponents/>}/>
                <Route path="/employees" element={<ListEmployeeComponents/>}/>
                <Route path="/add-employee/:id" element={<CreateEmployeeComponent/>}/>
                <Route path="/view-employee/:id" element={<ViewEmployeeComponent/>}/>
              </Routes>
            </div>
          <FooterComponents/>
        
      </Router>
    </div>
    
  );
}

export default App;
