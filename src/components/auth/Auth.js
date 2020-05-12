import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Auth.module.css';
import * as utility from '../../utility/utility';

class Auth extends Component {

    constructor() {
        super();
        this.state = {
            authForm: {
                email: {
                    validation: {
                        required: true,
                        email: true
                    },
                    dirty: false,
                    valid: false,
                    value: ''
                },
                password: {
                    validation: {
                        required: true,
                    },
                    dirty: false,
                    valid: false,
                    value: ''
                }
            },
            error: null,
            formValid: false
        }
    }

    inputChangeHandler = (event, name) => {
        let authFormCopy = { ...this.state.authForm }
        let inputFieldCopy = { ...authFormCopy[name] };
        inputFieldCopy.value = event.target.value;
        inputFieldCopy.dirty = true;
        inputFieldCopy.valid = utility.checkValidity(event.target.value, inputFieldCopy.validation);
        authFormCopy[name] = inputFieldCopy;
        this.setState({ authForm: authFormCopy }, () => {
            this.setState({ formValid: utility.checkFormValidity(this.state.authForm) });
        });
    }

    submitHandler = () => {
        let data = {
            email: this.state.authForm['email'].value,
            password: this.state.authForm['password'].value,
            returnSecureToken: true
        }
        this.props.clickHandler(data);
    }

    render() {
        let email = this.state.authForm['email'];
        let password = this.state.authForm['password'];
        return (
            <Aux>
                <div className="row">
                    <label htmlFor="email" className="col-12">Email</label>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="text" className={email.dirty && !email.valid ? 'form-control ' + classes.invalid : 'form-control'} id="email"
                            value={email.value} onChange={(event) => this.inputChangeHandler(event, 'email')} />
                    </div>
                </div>
                <div className="row mt-2">
                    <label htmlFor="password" className="col-12">Password</label>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="password" className={password.dirty && !password.valid ? 'form-control ' + classes.invalid : 'form-control'} id="password"
                            value={password.value} onChange={(event) => this.inputChangeHandler(event, 'password')} />
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <button className="btn btn-primary" disabled={!this.state.formValid} onClick={this.submitHandler}>{this.props.name}</button>
                </div>
            </Aux>
        )
    }
}

export default Auth;