import React, { Component } from 'react';
import axiosOrders from '../../../axios-orders';
import { CircularProgress } from '@material-ui/core';
import Input from '../../../components/Common/Input/Input';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index';
import * as utility from '../../../utility/utility';

/**
 * Component to display the form to fill the customer details. 
 * All form validations are included for the input fields.
 */
class ContactInfo extends Component {

    constructor() {
        super()
        this.state = {
            //contactForm contains the config for the form
            contactForm: {
                name: this.elementConfigGenerator('input', 'text', 'Enter your name', '', 'Name'),
                address: this.elementConfigGenerator('textarea', '', 'Enter your address', '', 'Address'),
                city: this.elementConfigGenerator('input', 'text', 'Enter your city', '', 'City'),
                zipcode: this.elementConfigGenerator('input', 'text', 'Enter your zipcode', '', 'Zipcode'),
                deliverymethod: this.elementConfigGenerator('select', '', '', 'fastest', 'DeliveryMethod', [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]),
            },
            //other local UI state
            spinner: false,
            openSnackbar: false,
            errorMessage: '',
            formValid: false
        }
    }

    //route back to checkout component
    backClickHandler = () => {
        this.props.history.goBack();
    }

    /**
     * To place the order on the server.
     * Handles form validation.
     */
    orderHandler = () => {
        let inputKeys = Object.keys(this.state.contactForm);
        let valid = true;
        //formValid check
        for (let key of inputKeys) {
            if (!this.state.contactForm[key].valid) {
                valid = false;
                this.setState({ openSnackbar: true, errorMessage: this.state.contactForm[key].validation.errorMessage });
                break;
            }
        }
        if (valid) {
            this.setState({ spinner: true });
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totalPrice,
                customer: {
                    name: this.state.contactForm.name.value,
                    address: this.state.contactForm.address.value,
                    city: this.state.contactForm.city.value,
                    zipcode: this.state.contactForm.zipcode.value
                },
                deliveryMethod: this.state.contactForm.deliverymethod.value,
                userId: this.props.userId
            }
            axiosOrders.post('/orders.json?auth=' + this.props.token, order).then(response => {
                //action to clear ingredients in redux store after successful order placement
                this.props.clearIngredients();
                this.props.history.replace('/burger-builder');
            }).catch(error => {
                this.setState({ spinner: false });
            });
        }
    }

    //event handler for input change
    inputChangeHandler = (event, key) => {
        let orderForm = { ...this.state.contactForm };
        let inputField = { ...orderForm[key] };
        inputField.value = event.target.value;
        //checkValidity checks for validity of input given based on the validation config for the field
        inputField.valid = utility.checkValidity(event.target.value, inputField.validation);
        inputField.dirty = true;
        orderForm[key] = inputField;
        //callback is used because formValid depends on the setState of contactForm
        this.setState({ contactForm: orderForm }, () => {
            this.setState({ formValid: utility.checkFormValidity(this.state.contactForm) });
        });
    }

    /**
     * Method to generate form control config for every input field
     */
    elementConfigGenerator = (elType, type, placeholder, value, fieldName, options = []) => {
        let validation = {
            required: true
        }
        if (fieldName === 'Zipcode') {
            validation.maxlength = 6;
            validation.numeric = true;
            validation.minlength = 6;
            validation.errorMessage = 'ZIPCode should be a Six Digit Number';
        } else {
            validation.errorMessage = 'The fields marked * are required';
        }
        let configObject = {
            fieldName: fieldName,
            elementType: elType,
            elementConfig: {
                placeholder: placeholder,
                type: type
            },
            value: value,
            valid: fieldName === 'DeliveryMethod',
            dirty: false
        }
        if (options.length > 0) {
            configObject.elementConfig.options = options;
        }
        if (fieldName !== 'DeliveryMethod') {
            configObject.validation = validation;
        }
        return configObject;
    }

    //to close error snackbar 
    handleCloseSnackbar = () => {
        this.setState({ openSnackbar: false });
    }

    render() {
        let inputKeys = Object.keys(this.state.contactForm);
        return (
            <div className="container">
                {inputKeys.map(key => {
                    return <Input {...this.state.contactForm[key]} key={key} onChange={this.inputChangeHandler} />
                })}
                <div className="row mt-2">
                    <div className="col-12 text-center">
                        <button className="btn btn-danger" onClick={this.backClickHandler}>Back</button>
                        <button className="btn btn-success ml-2" disabled={!this.state.formValid} onClick={this.orderHandler}>Order</button>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 text-center">
                        {this.state.spinner ? <CircularProgress /> : null}
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.openSnackbar}
                    onClose={this.handleCloseSnackbar}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackbar} severity="error">
                        {this.state.errorMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        )
    }
}

//map state of redux as props to the component
const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

//map actions of redux as props to the component
const mapActionsToProps = dispatch => {
    return {
        clearIngredients: () => dispatch(actions.clearIngredients())
    }
}
export default connect(mapStateToProps, mapActionsToProps)(ContactInfo);