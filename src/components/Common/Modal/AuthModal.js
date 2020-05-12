import React, { Component } from 'react';
import AuthComp from '../../auth/Auth';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

class AuthModal extends Component {

    signupHandler = (data) => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4_db1tQSA-WN_lmV1nexNukH8BOX0m9c', data).then(response => {
            this.props.showModal(false);
        }).catch(error => {
        });
    }

    render() {
        return (
            <Dialog
                open={this.props.show}
                onClose={() => this.props.showModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{this.props.modalTitle}</DialogTitle>
                <DialogContent>
                    <DialogContent id="alert-dialog-description">
                        <AuthComp name='Signup' clickHandler={this.signupHandler} />
                    </DialogContent>
                </DialogContent>
            </Dialog>
        );
    }
}

export default AuthModal;