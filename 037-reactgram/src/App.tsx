import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import styles from './App.module.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Homepage from './components/Homepage/Homepage';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { UserProvider } from './store/user';
import Footer from './components/Footer/Footer';
import { authContext } from './store/auth';

function App(): React.ReactElement {
  const { token, userId } = useContext(authContext);

  return token && userId ? (
    <UserProvider>
      <section className={styles.App}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/settings" component={Settings} />
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
