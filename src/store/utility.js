import { INGREDIENT_COST } from './reducers/burgerBuilder';

export const updateState = (state, updatedProps) => {
    return { ...state, ...updatedProps };
}

export const updateIngredients = (state, name, operation) => {
    let ingredientsCopy = { ...state.ingredients };
    let updatedState = operation === 'add' ? () => {
        ingredientsCopy[name]++;
        state.totalPrice = state.totalPrice + INGREDIENT_COST[name];
        return updateState(state, { ingredients: ingredientsCopy });
    } : () => {
        if (ingredientsCopy[name] > 0) {
            ingredientsCopy[name]--;
            state.totalPrice = state.totalPrice - INGREDIENT_COST[name];
        }
        return updateState(state, { ingredients: ingredientsCopy });
    };
    return updatedState();
}