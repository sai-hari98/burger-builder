import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import NavBar from './NavBar/NavBar';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Auth from '../../containers/Auth/Auth';
import ContactInfo from '../../containers/Checkout/ContactInfo/ContactInfo';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Component } from 'react';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('../../containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('../../containers/Orders/Orders');
});

class Layout extends Component {

    componentDidMount() {
        console.log('Layout component mount');
        let loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn) {
            let data = {
                idToken: localStorage.getItem('idToken'),
                refreshToken: localStorage.getItem('refreshToken'),
                localId: localStorage.getItem('userId')
            }
            this.props.initAuthStorage(data);
        }
    }

    componentDidUpdate() {
        console.log('Layout component update');
    }

    render() {
        let invalidPage = (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 text-center text-danger font-weight-bold">
                        Sorry! Page Not Available.
                    </div>
                </div>
            </div>
        );
        let routes = null;
        if (this.props.loggedIn) {
            routes = (
                <Auxillary>
                    <Route path="/checkout" exact component={asyncCheckout} />
                    <Route path="/checkout/contact-info" exact component={ContactInfo} />
                    <Route path="/orders" exact component={asyncOrders} />
                </Auxillary>
            );
        } else {
            routes = (
                <Route path="/login" exact component={Auth} />
            )
        }
        return (
            <Auxillary>
                <NavBar />
                <main>
                    <Switch>
                        <Route path="/burger-builder" exact component={BurgerBuilder} />
                        {routes}
                        <Redirect from="/" exact to="/burger-builder" />
                        <Route render={() => invalidPage} />
                    </Switch>
                </main>
            </Auxillary>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapActionsToProps = dispatch => {
    return {
        initAuthStorage: (data) => dispatch(actions.initAuthStorage(data))
    }
}
export default connect(mapStateToProps, mapActionsToProps)(Layout);