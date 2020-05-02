import React from 'react';
import Burger from '../../Burger/Burger'
const checkoutSummary = (props) => (
    <div className="container">
        <h3 className="text-center">Checkout Burger</h3>
        <Burger ingredients={props.ingredients}></Burger>
        <div className="row justify-content-center">
            <button className="btn btn-danger" onClick={props.cancel}>Cancel</button>
            <button className="btn btn-success ml-2" onClick={props.continue} disabled={props.disabled}>Continue</button>
        </div>
    </div>
);

export default checkoutSummary;