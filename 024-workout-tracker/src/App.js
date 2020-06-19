import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/home' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
