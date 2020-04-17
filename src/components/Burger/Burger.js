import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(
        ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient type={ingredient} key={ingredient + i} />
            })
        }
    ).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformedIngredients.length === 0)
        transformedIngredients = <p>Please add ingredients</p>
    return (
        <div className={classes.Burger + " row justify-content-center"}>
            <div className="col-10">
                <BurgerIngredient type='bread-top' />
                {transformedIngredients}
                <BurgerIngredient type='bread-bottom' />
            </div>
        </div>
    )
}

export default burger;