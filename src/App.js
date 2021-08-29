import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from './components/Transaction';
import Header from './components/Header';
import Addaccount from './components/Addaccount';
import Alltransaction from './components/Alltransaction';
import UpdateTransaction from './components/UpdateTransaction';
import Unadjusted from './components/Unadjusted';
import Adjusted from './components/Adjusted';
import Financialstatement from './components/Financialstatement';
import Postclosing from './components/Postclosing';
import Home from './components/Home';

import { BrowserRouter, Route,Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path='/Home'>
          <Home />
        </Route>
        <Route path='/addtransaction'>
          <Transaction />
        </Route>
        <Route path='/addaccount'>
          <Addaccount />
        </Route>
        <Route path='/alltransaction'>
          <Alltransaction />
        </Route>
        <Route path='/updateTransaction/:id'>
          <UpdateTransaction/>
        </Route>
        <Route path='/unadjusted'>
          <Unadjusted />
        </Route>
        <Route path='/adjusted'>
          <Adjusted />
        </Route>
        <Route path='/financialstatement'>
          <Financialstatement />
        </Route>
        <Route path='/postclosing'>
          <Postclosing />
        </Route>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
