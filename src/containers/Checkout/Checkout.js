import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {

    state = {
        ingredients: {

        }
    }
    componentDidMount() {
        let queryParams = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let totalPrice = 0;
        for (let params of queryParams.entries()) {
            if (params[0] !== 'price') {
                ingredients[params[0]] = +params[1];
            } else {
                totalPrice = +params[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: totalPrice });

    }

    checkoutConfirmed = () => {
        this.props.history.push({
            pathname: '/checkout/contact-info',
            state: this.state
        });
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    render() {
        // let isEmpty = Object.keys(this.state.ingredients).length === 0;
        // let ingredientCount = 0
        // for (let ingredient of Object.keys(this.state.ingredients)) {
        //     ingredientCount += this.state.ingredients[ingredient];
        // }
        let isDisable = this.props.location.search === '';
        console.log(this.props.location.search);
        console.log(isDisable);
        return (
            <CheckoutSummary ingredients={this.state.ingredients}
                cancel={this.checkoutCancelled}
                continue={this.checkoutConfirmed}
                disabled={isDisable} />
        )
    }
}

export default Checkout;