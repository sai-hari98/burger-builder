import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ContactInfo from './containers/Checkout/ContactInfo/ContactInfo';
import Orders from './containers/Orders/Orders';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
class App extends Component {
  render() {
    //redux store creation to maintain a global application state
    const store = createStore(reducer);
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
