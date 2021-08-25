import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from './components/Transaction';
import Header from './components/Header';
import Addaccount from './components/Addaccount';
import Alltransaction from './components/Alltransaction';
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
        <Route path='/alltransaction'>
          <Alltransaction />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
