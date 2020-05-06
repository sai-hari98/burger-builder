import actions from './actions';
//reducer to manipulate the store

const initialState = {
    ingredients: {
        Cheese: 0,
        Salad: 0,
        Bacon: 0,
        Meat: 0
    },
    totalPrice: 4
}

const INGREDIENT_COST = {
    Salad: 0.5,
    Meat: 1.5,
    Cheese: 0.4,
    Bacon: 0.7
}

const reducer = (state = initialState, action) => {
    let stateCopy = { ...state };
    let ingredientsCopy = { ...stateCopy.ingredients };
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            ingredientsCopy[action.payload.name]++;
            stateCopy.ingredients = ingredientsCopy;
            stateCopy.totalPrice = stateCopy.totalPrice + INGREDIENT_COST[action.payload.name];
            return stateCopy;
        case actions.REMOVE_INGREDIENT:
            if (ingredientsCopy[action.payload.name] > 0) {
                ingredientsCopy[action.payload.name]--;
                stateCopy.ingredients = ingredientsCopy;
                stateCopy.totalPrice = stateCopy.totalPrice - INGREDIENT_COST[action.payload.name];
            }
            return stateCopy;
        case actions.CLEAR_INGREDIENTS:
            stateCopy.ingredients = {
                Cheese: 0,
                Salad: 0,
                Bacon: 0,
                Meat: 0
            };
            stateCopy.totalPrice = 4;
            return stateCopy;
        default:
            return stateCopy;
    }
}

export default reducer;