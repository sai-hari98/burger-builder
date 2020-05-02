import React, { Component } from 'react';
import axiosOrders from '../../../axios-orders';
import { CircularProgress } from '@material-ui/core';
class ContactInfo extends Component {

    state = {
        name: '',
        address: '',
        city: '',
        zipcode: '',
        spinner: false
    }

    backClickHandler = () => {
        this.props.history.goBack();
    }

    orderHandler = () => {
        this.setState({ spinner: true });
        const order = {
            ingredients: this.props.location.state.ingredients,
            price: this.props.location.state.totalPrice,
            customer: {
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                zipcode: this.state.zipcode
            },
            deliveryMethod: 'fastest'
        }
        axiosOrders.post('/orders.json', order).then(response => {
            console.log(response);
            this.props.history.replace('/burger-builder');
        }).catch(error => {
            console.log(error);
            this.setState({ spinner: false });
            alert('error occurred');
        });
    }
    inputChangeHandler = (event, key) => {
        let updateState = { ...this.state };
        updateState[key] = event.target.value;
        this.setState(updateState);
    }
    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <label htmlFor="name" className="col-3">Name</label>
                    <div className="col-5">
                        <input type="text" onChange={(event) => this.inputChangeHandler(event, 'name')} className="form-control" id="name" value={this.state.name} placeholder="Enter Name" />
                    </div>
                </div>
                <div className="row mt-2">
                    <label htmlFor="address" className="col-3">Address</label>
                    <div className="col-5">
                        <textarea id="address" onChange={(event) => this.inputChangeHandler(event, 'address')} cols="30" rows="10" className="form-control" placeholder="Enter Address" value={this.state.address}></textarea>
                    </div>
                </div>
                <div className="row mt-2">
                    <label htmlFor="city" className="col-3">City</label>
                    <div className="col-5">
                        <input type="text" onChange={(event) => this.inputChangeHandler(event, 'city')} className="form-control" id="city" value={this.state.city} placeholder="Enter City" />
                    </div>
                </div>
                <div className="row mt-2">
                    <label htmlFor="zipcode" className="col-3">ZipCode</label>
                    <div className="col-5">
                        <input type="text" onChange={(event) => this.inputChangeHandler(event, 'zipcode')} className="form-control" id="zipcode" value={this.state.zipcode} placeholder="Enter Zipcode" />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 text-center">
                        <button className="btn btn-danger" onClick={this.backClickHandler}>Back</button>
                        <button className="btn btn-success ml-2" onClick={this.orderHandler}>Order</button>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 text-center">
                        {this.state.spinner ? <CircularProgress /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactInfo;