import React, { Component } from 'react';
import axiosOrders from '../../../axios-orders';
import { CircularProgress } from '@material-ui/core';
import Input from '../../../components/Common/Input/Input';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux'
import actions from '../../../store/actions';
class ContactInfo extends Component {

    constructor() {
        super()
        this.state = {
            contactForm: {
                name: this.elementConfigGenerator('input', 'text', 'Enter your name', '', 'Name'),
                address: this.elementConfigGenerator('textarea', '', 'Enter your address', '', 'Address'),
                city: this.elementConfigGenerator('input', 'text', 'Enter your city', '', 'City'),
                zipcode: this.elementConfigGenerator('input', 'text', 'Enter your zipcode', '', 'Zipcode'),
                deliverymethod: this.elementConfigGenerator('select', '', '', 'fastest', 'DeliveryMethod', [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]),
            },
            spinner: false,
            openSnackbar: false,
            errorMessage: '',
            formValid: false
        }
    }

    backClickHandler = () => {
        this.props.history.goBack();
    }

    orderHandler = () => {
        let inputKeys = Object.keys(this.state.contactForm);
        let valid = true;
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
                deliveryMethod: this.state.contactForm.deliverymethod.value
            }
            axiosOrders.post('/orders.json', order).then(response => {
                this.props.clearIngredients();
                console.log(response);
                this.props.history.replace('/burger-builder');
            }).catch(error => {
                console.log(error);
                this.setState({ spinner: false });
                alert('error occurred');
            });
        }
    }
    inputChangeHandler = (event, key) => {
        let orderForm = { ...this.state.contactForm };
        let inputField = { ...orderForm[key] };
        inputField.value = event.target.value;
        inputField.valid = this.checkValidity(event.target.value, inputField.validation);
        inputField.dirty = true;
        orderForm[key] = inputField;
        //callback is used because formValid depends on the setState of contactForm
        this.setState({ contactForm: orderForm }, () => {
            let formValid = true;
            for (let inputField of Object.keys(this.state.contactForm)) {
                formValid = this.state.contactForm[inputField].valid && formValid;
                if (!formValid) {
                    break;
                }
            }
            console.log(formValid);
            this.setState({ formValid: formValid });
            console.log(inputField.validation);
        });
    }

    checkValidity = (value, validation) => {
        let isValid = true;
        if (!validation) {
            return true;
        }

        if (validation.required) {
            isValid = isValid && value.trim() != '';
        }
        if (validation.minlength) {
            isValid = isValid && value.trim().length >= validation.minlength;
        }
        if (validation.maxlength) {
            isValid = isValid && value.trim().length <= validation.maxlength;
        }
        if (validation.numeric) {
            isValid = isValid && !isNaN(value);
        }
        return isValid;
    }

    elementConfigGenerator = (elType, type, placeholder, value, fieldName, options = []) => {
        let validation = {
            required: true
        }
        if (fieldName == 'Zipcode') {
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
            valid: fieldName == 'DeliveryMethod',
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapActionsToProps = dispatch => {
    return {
        clearIngredients: () => dispatch({ type: actions.CLEAR_INGREDIENTS })
    }
}
export default connect(mapStateToProps, mapActionsToProps)(ContactInfo);