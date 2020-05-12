import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilder from './store/reducers/burgerBuilder';
import auth from './store/reducers/auth';
class App extends Component {
  render() {
    //process.env.NODE_ENV is used so that redux debug can be enabled only in dev environment.
    const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
    const reducers = combineReducers({
      burger: burgerBuilder,
      auth: auth
    });
    //redux store creation to maintain a global application state
    const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
    //BrowserRouter to support routing in the app
    //Switch - to render only one of the routes
    //Route - define the component to display for various routes
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
