import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux'

/**
 * Container Component to display the checkout summary
 */
class Checkout extends Component {

    // state = {
    //     ingredients: {

    //     }
    // }

    // componentDidMount() {
    //     let queryParams = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let totalPrice = 0;
    //     for (let params of queryParams.entries()) {
    //         if (params[0] !== 'price') {
    //             ingredients[params[0]] = +params[1];
    //         } else {
    //             totalPrice = +params[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    // }

    //route to contact-info component
    checkoutConfirmed = () => {
        this.props.history.push({
            pathname: '/checkout/contact-info',
        });
    }

    //route back to burger builder
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    render() {
        //check to disable the order button based on number of ingredients(ingredientsCount<=0)
        // let isEmpty = Object.keys(this.state.ingredients).length === 0;
        let ingredientCount = 0
        for (let ingredient of Object.keys(this.props.ingredients)) {
            ingredientCount += this.props.ingredients[ingredient];
        }
        // let isDisable = this.props.location.search === '';
        let isDisable = ingredientCount === 0;
        return (
            <CheckoutSummary ingredients={this.props.ingredients}
                cancel={this.checkoutCancelled}
                continue={this.checkoutConfirmed}
                disabled={isDisable} />
        )
    }
}

//map state of redux as props to the component
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);