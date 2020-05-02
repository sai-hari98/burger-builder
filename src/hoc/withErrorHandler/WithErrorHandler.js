import React, { Component } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Aux from '../Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            console.log('Error Handler HOC componentDidMount');
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(null, error => {
                console.log('Inside Error');
                console.log(error);
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        handleClose = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Aux>
                    <Dialog
                        open={this.state.error !== null}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="sm"
                        fullWidth={true}
                    >
                        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                        <DialogContent id="alert-dialog-description">
                            <div className="row">
                                <div className="col-12 text-center">
                                    {this.state.error ? this.state.error.message : null}
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;