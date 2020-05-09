import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ContactInfo from './containers/Checkout/ContactInfo/ContactInfo';
import Orders from './containers/Orders/Orders';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import burgerBuilder from './store/reducers/burgerBuilder';
class App extends Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    //redux store creation to maintain a global application state
    const store = createStore(burgerBuilder, composeEnhancers(applyMiddleware(thunk)));
    //BrowserRouter to support routing in the app
    //Switch - to render only one of the routes
    //Route - define the component to display for various routes
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/burger-builder" exact component={BurgerBuilder} />
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/checkout/contact-info" exact component={ContactInfo} />
              <Route path="/orders" exact component={Orders} />
              <Redirect from="/" to="/burger-builder" />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
