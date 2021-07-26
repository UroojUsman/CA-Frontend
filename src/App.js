import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Transaction } from './Transaction';
import Header from './Header';
import Addaccount from './Addaccount';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path='/addtransaction'>
          <Transaction />
        </Route>
        <Route path='/addaccount'>
          <Addaccount />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
