import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Modal component to display a modal whenever user needs it.
 * Makes use of MaterialUI Dialog for a modal.
 */
class Modal extends Component {

    componentDidUpdate() {
        console.log('Modal render');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show) || (this.props.spinner !== nextProps.spinner);
    }
    render() {
        let spinner = null;
        if (this.props.spinner) {
            spinner = <CircularProgress />
        }
        return (
            <Dialog
                open={this.props.show}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{this.props.modalTitle}</DialogTitle>
                <DialogContent>
                    <DialogContent id="alert-dialog-description">
                        <div className="row justify-content-center">
                            {spinner}
                        </div>
                        {this.props.children}
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.showModal(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.checkout} color="primary" autoFocus>
                        {this.props.buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default Modal;