import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
