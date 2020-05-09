import actions from './actionTypes';
import axiosOrders from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actions.ADD_INGREDIENT,
        payload: {
            name: name
        }
    }
}

export const removeIngredient = (name) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        payload: {
            name: name
        }
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actions.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

export const clearIngredients = () => {
    return {
        type: actions.CLEAR_INGREDIENTS
    }
}

export const initIngredients = () => {
    return dispatch => {
        axiosOrders.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => { });
    }
}