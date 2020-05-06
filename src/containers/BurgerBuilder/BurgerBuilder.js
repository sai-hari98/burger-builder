import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import axiosOrders from '../../axios-orders';
import BurgerBuilderContext from './Context/BurgerBuilderContext';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import actions from '../../store/actions';
const INGREDIENT_COST = {
    Salad: 0.5,
    Meat: 1.5,
    Cheese: 0.4,
    Bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        // purchasable: false,
        purchasing: false,
        spinner: false
    }

    componentDidMount() {
        // console.log('Burger Builder componentDidMount');
        // axiosOrders.get('/ingredients.json').then(response => {
        //     this.setState({ ingredients: response.data });
        //     console.log('Ingredients data obtained');
        // }).catch(error => { });
    }

    addIngredient = (ingredient) => {
        let ingredients = { ...this.state.ingredients };
        let totalPrice = this.state.totalPrice;
        totalPrice += INGREDIENT_COST[ingredient];
        ingredients[ingredient]++;
        this.setState({ ingredients: ingredients, totalPrice: totalPrice });
        this.updatePurchasable(ingredients);
    }

    removeIngredient = (ingredient) => {
        let ingredients = { ...this.state.ingredients };
        let totalPrice = this.state.totalPrice;
        if (ingredients[ingredient] > 0) {
            ingredients[ingredient]--;
            totalPrice -= INGREDIENT_COST[ingredient];
        }
        this.setState({ ingredients: ingredients, totalPrice: totalPrice });
        this.updatePurchasable(ingredients);
    }

    updatePurchasing = (show) => {
        this.setState({ purchasing: show });
    }

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
        // this.setState({ spinner: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Sairam Hari',
        //         address: 'no:5 abc street',
        //         city: 'chennai',
        //         zipcode: '600045'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axiosOrders.post('/orders.json', order).then(response => {
        //     console.log(response);
        //     this.setState({ purchasing: false, spinner: false });
        // }).catch(error => {
        //     console.log(error);
        //     this.setState({ purchasing: false, spinner: false });
        // });
    }
    render() {
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
        }
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        addIngredient: (ingredient) => dispatch({ type: actions.ADD_INGREDIENT, payload: { name: ingredient } }),
        removeIngredient: (ingredient) => dispatch({ type: actions.REMOVE_INGREDIENT, payload: { name: ingredient } })
    }
}
export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(BurgerBuilder, axiosOrders));