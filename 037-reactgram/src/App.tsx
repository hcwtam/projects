import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Homepage from './components/Homepage/Homepage';

function App(): React.ReactElement {
  return (
    <section className={styles.App}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={Homepage} />
      </Switch>
    </section>
  );
}

export default App;
