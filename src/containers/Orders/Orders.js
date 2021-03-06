import React, { Component } from 'react';
import axiosOrders from '../../axios-orders';
import { CircularProgress } from '@material-ui/core';
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
//Component to display the orders placed.
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        let queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
        axiosOrders.get('/orders.json' + queryParams).then(response => {
            let orders = [];
            for (let order of Object.keys(response.data)) {
                orders.push({ ...response.data[order], id: order });
            }
            this.setState({ loading: false, orders: orders });
            console.log(this.state.orders);
        }).catch(error => {
            this.setState({ loading: false });
        })
    }

    render() {
        let spinner = (
            <div className="row mt-3">
                <div className="col-12 text-center">
                    <CircularProgress />
                </div>
            </div>
        );
        let orderItems = [];
        for (let order of this.state.orders) {
            console.log(order.id)
            orderItems.push(<Order order={order} key={order.id} />)
        }

        orderItems = orderItems.length > 0 ? orderItems : (
            <div className="row mt-5">
                <div className="col-12 text-center text-danger font-weight-bold">
                    Orders are empty.
                </div>
            </div>
        )
        return (
            <div className="container">
                {this.state.loading ? spinner : orderItems}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(withErrorHandler(Orders, axiosOrders));