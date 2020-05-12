import React from 'react';

/**
 * component to display a single order in a card.
 * Card designed using bootstrap classes
 * @param {*} props - contains order details
 */
const order = (props) => {

    let ingredients = [];
    for (let ingredient of Object.keys(props.order.ingredients)) {
        if (props.order.ingredients[ingredient]) {
            ingredients.push((<div className="row mt-2" key={ingredient}>
                <div className="col-12">
                    {ingredient} : {props.order.ingredients[ingredient]}
                </div>
            </div>));
        }
    }

    return (
        <div className="row mt-2 mb-2">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                Order ID: {props.order.id}
                            </div>
                        </div>
                        {ingredients}
                        <div className="row">
                            <div className="col-12">
                                Price: {props.order.price.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default order;