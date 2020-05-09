import actions from '../actions/actionTypes';
import * as utility from '../utility';
//reducer to manipulate the store

const initialState = {
    ingredients: null,
    totalPrice: 4
}

export const INGREDIENT_COST = {
    Salad: 0.5,
    Meat: 1.5,
    Cheese: 0.4,
    Bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return utility.updateIngredients(state, action.payload.name, 'add');
        case actions.REMOVE_INGREDIENT:
            return utility.updateIngredients(state, action.payload.name, 'sub');
        case actions.CLEAR_INGREDIENTS:
            return utility.updateState(state, { ingredients: null, totalPrice: 4 });
        case actions.SET_INGREDIENTS:
            if (state.ingredients == null) {
                return utility.updateState(state, { ingredients: action.payload.ingredients });
            }
            return state;
        default:
            return state;
    }
}

export default reducer;