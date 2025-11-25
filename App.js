import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';

import CoffeeShop from './Pages/coffeeshop';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Coffeeshop' element={<CoffeeShop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
