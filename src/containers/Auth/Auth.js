import React, { Component } from 'react';
import AuthComp from '../../components/auth/Auth';
import AuthModal from '../../components/Common/Modal/AuthModal';
import axios from 'axios';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';
class Auth extends Component {

    state = {
        showModal: false,
        error: null
    }

    showModal = (show) => {
        this.setState({ showModal: show });
    }

    loginHandler = (data) => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4_db1tQSA-WN_lmV1nexNukH8BOX0m9c', data).then(response => {
            console.log(response.data);
            this.props.signIn(response.data);
            localStorage.setItem('idToken', response.data.idToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('userId', response.data.localId);
            this.props.refreshToken();
            this.props.history.push('/burger-builder');
        }).catch(error => {
            this.setState({ error: error.response.data.error.message })
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5 pt-5 justify-content-center">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-title text-center mt-2">Login</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 text-center text-danger">
                                        {this.state.error}
                                    </div>
                                </div>
                                <AuthComp name='Login' clickHandler={this.loginHandler} />
                                <div className="row">
                                    <div className="col-12">
                                        <a style={{ 'cursor': 'pointer' }} onClick={() => this.showModal(true)}>New User? Signup Here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AuthModal show={this.state.showModal} modalTitle='Signup' showModal={this.showModal} />
            </div>
        );
    }
}

const mapActionsToProps = dispatch => {
    return {
        signIn: (data) => dispatch(authActions.setAuth(data)),
        refreshToken: () => dispatch(authActions.refreshToken())
    }
}
export default connect(null, mapActionsToProps)(Auth);