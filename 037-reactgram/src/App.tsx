import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import styles from './App.module.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Homepage from './components/Homepage/Homepage';
import Profile from './components/Profile/Profile';
import { autoLogin, usernameExists } from './utils/auth';
import { UserProvider } from './store/user';
import Footer from './components/Footer/Footer';

function App(): React.ReactElement {
  const [token, setToken] = useState<string | null | void>(null);

  useEffect(() => {
    const fetchLogin = async () => {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        setToken(localToken);
      } else {
        const newToken = await autoLogin();

        setToken(newToken);
      }
    };
    fetchLogin();
  }, [token]);

  return token ? (
    <UserProvider>
      <section className={styles.App}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            exact
            path="/:username"
            component={({ match }) => (
              <Profile username={match.params.username} />
            )}
          />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </section>
    </UserProvider>
  ) : (
    <section className={styles.App}>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </section>
  );
}

export default App;
