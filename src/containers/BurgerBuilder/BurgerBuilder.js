import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import axiosOrders from '../../axios-orders';
import BurgerBuilderContext from './Context/BurgerBuilderContext';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';
const INGREDIENT_COST = {
    Salad: 0.5,
    Meat: 1.5,
    Cheese: 0.4,
    Bacon: 0.7
}

//Container component for burger builder
class BurgerBuilder extends Component {

    state = {
        // purchasable: false,
        purchasing: false,
        spinner: false
    }

    componentDidMount() {
        console.log('Burger Builder componentDidMount');
        this.props.initIngredients();
    }

    // addIngredient = (ingredient) => {
    //     let ingredients = { ...this.state.ingredients };
    //     let totalPrice = this.state.totalPrice;
    //     totalPrice += INGREDIENT_COST[ingredient];
    //     ingredients[ingredient]++;
    //     this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    //     this.updatePurchasable(ingredients);
    // }

    // removeIngredient = (ingredient) => {
    //     let ingredients = { ...this.state.ingredients };
    //     let totalPrice = this.state.totalPrice;
    //     if (ingredients[ingredient] > 0) {
    //         ingredients[ingredient]--;
    //         totalPrice -= INGREDIENT_COST[ingredient];
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    //     this.updatePurchasable(ingredients);
    // }

    //updating state to show the modal
    updatePurchasing = (show) => {
        this.setState({ purchasing: show });
    }

    //to check whether customer has added ingredients and the burger is purchasable
    updatePurchasable = (ingredients) => {
        const ingredientsKeys = Object.keys(ingredients);
        const count = ingredientsKeys.map((ingredient) => {
            return ingredients[ingredient];
        }).reduce((sum, el) => {
            return sum + el;
        });
        console.log(count);
        // this.setState((prevState, props) => {
        //     return { purchasable: count > 0 }
        // });
        return count > 0;
    }

    //to route to checkout component
    checkoutHandler = () => {
        // const queryParams = [];
        // for (let ingredient in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(ingredient) + "=" + encodeURIComponent(this.state.ingredients[ingredient]));
        // }
        // let queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString + '&price=' + this.state.totalPrice
        });
    }

    render() {
        //circular progress to show a spinner
        let burger = (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <CircularProgress color="primary" />
                    </div>
                </div>
            </div>
        )
        if (this.props.ings !== null) {
            //BurgerBuilderContext to pass the state values from BurgerBuilder Component to BuildControls component.
            //Refer to context object above to see the properties being added into context.
            let context = {
                ...this.state,
                purchasable: this.updatePurchasable(this.props.ings),
                ingredients: this.props.ings,
                totalPrice: this.props.totalPrice,
                click: this.updatePurchasing,
                add: this.props.addIngredient,
                remove: this.props.removeIngredient,
                unitPrice: INGREDIENT_COST,
                checkout: this.checkoutHandler
            };
            burger = (
                <div className="container">
                    <Burger ingredients={this.props.ings} />
                    <BurgerBuilderContext.Provider value={context}>
                        <BuildControls />
                    </BurgerBuilderContext.Provider>
                </div>
            )
        }
        return burger;
    }
}

//map state of redux as props to the component
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

//map actions of redux as props to the component
const mapActionsToProps = (dispatch) => {
    return {
        addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        initIngredients: () => dispatch(actions.initIngredients())
    }
}
export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(BurgerBuilder, axiosOrders));