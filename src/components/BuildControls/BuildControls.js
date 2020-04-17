import React, { useContext } from 'react';
import BuildControl from './BuildControl/BuildControl';
import Modal from '../Common/Modal/Modal';
import BurgerBuilderContext from '../../containers/BurgerBuilder/Context/BurgerBuilderContext';

const BuildControls = (props) => {
    const burgerBuilderContext = useContext(BurgerBuilderContext);
    const ingredientKeys = Object.keys(burgerBuilderContext.ingredients);
    const ingredientBuildControls = ingredientKeys.map((ingredient) => {
        return <BuildControl label={ingredient}
            count={burgerBuilderContext.ingredients[ingredient]}
            key={ingredient}
            add={() => burgerBuilderContext.add(ingredient)}
            remove={() => burgerBuilderContext.remove(ingredient)} />
    });
    const ingredientSummary = ingredientKeys.map((ingredient) => {
        return <div className="row" key={ingredient}>
            <div className="col-sm-4">
                {ingredient}
            </div>
            <div className="col-sm-2 text-center">
                {burgerBuilderContext.ingredients[ingredient]}
            </div>
            <div className="col-sm-1 text-center">
                x
            </div>
            <div className="col-sm-2 text-right">
                {burgerBuilderContext.unitPrice[ingredient]}
            </div>
            <div className="col-sm-1 text-center">
                =
            </div>
            <div className="col-sm-2 text-left">
                {(burgerBuilderContext.ingredients[ingredient] * burgerBuilderContext.unitPrice[ingredient]).toFixed(2)}
            </div>
        </div>
    });

    return (
        <div className="row justify-content-center">
            <div className="card col-8">
                <div className="card-body">
                    {ingredientBuildControls}
                    <div className="row">
                        <div className="col-12 text-right text-danger font-weight-bold">
                            {"Total: $" + burgerBuilderContext.totalPrice.toFixed(2)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" disabled={!burgerBuilderContext.purchasable}
                                onClick={() => burgerBuilderContext.click(true)}>
                                Order Now
                            </button>
                            <Modal buttonText="Order Now"
                                modalTitle="Order Summary"
                                show={burgerBuilderContext.purchasing}
                                checkout={() => burgerBuilderContext.checkout()}
                                showModal={burgerBuilderContext.click}
                                spinner={burgerBuilderContext.spinner}>
                                {ingredientSummary}
                                <div className="row">
                                    <div className="col-12 text-right">
                                        Total: <span className="text-danger font-weight-bold">${burgerBuilderContext.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuildControls;