import React, { useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authCheckState, fetchItems } from './actions';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Shop from './components/Shop/Shop';
import Checkout from './components/Checkout/Checkout';
import Product from './components/Product/Product';
import Success from './components/Success/Success';
import Orders from './components/Orders/Orders';
import ScrolltoTop from './components/utils/ScrolltoTop';

function App() {
  const dispatch = useDispatch();

  const onTryAutoLogin = useCallback(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin]);

  const fetchItemsData = useCallback(() => dispatch(fetchItems()), [dispatch]);

  useEffect(() => {
    fetchItemsData();
  }, [fetchItemsData]);

  return (
    <div className="App">
      <ScrolltoTop />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={Shop} />
        <Route path="/product" component={Product} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/success" component={Success} />
        <Route path="/orders" component={Orders} />
        <Redirect to="/shop" />
      </Switch>
    </div>
  );
}

export default App;
