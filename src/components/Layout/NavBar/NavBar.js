import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './SideDrawer/SideDrawer';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Auxillary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as actions from '../../../store/actions/index';

/**
 * Navbar component to display a reusable navbar for the application.
 * Created using bootstrap navbar classes.
 * @param {*} props 
 */
const NavBar = (props) => {
    const [state, changeState] = useState({ sideDrawer: false });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        changeState({ sideDrawer: open });
    }

    const logoutHandler = () => {
        props.logout();
        props.history.push('/');
    }
    let uLinks = [
        <Link to="/checkout" className="nav-link">Checkout</Link>,
        <Link to="/orders" className="nav-link">Orders</Link>,
        <Link to="/" onClick={logoutHandler} className="nav-link">Logout</Link>
    ];

    let nonULinks = [
        <Link to="/login" className="nav-link">Login</Link>
    ];
    let userLinks = (
        <Aux>
            <li className="nav-item active">
                <Link to="/checkout" className="nav-link">Checkout</Link>
            </li>
            <li className="nav-item active">
                <Link to="/orders" className="nav-link">Orders</Link>
            </li>
            <li className="nav-item active">
                <Link to="/" onClick={logoutHandler} className="nav-link">Logout</Link>
            </li>
        </Aux>
    );

    let nonUserLinks = (
        <li className="nav-item active">
            <Link to="/login" className="nav-link">Login</Link>
        </li>
    )

    const routingHandler = (route) => {
        if (route == '/') {
            logoutHandler();
        } else {
            props.history.push(route);
        }
    }
    //Link to define a router link to route to the component given in 'to' prop
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Burger Builder App</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to="/burger-builder" className="nav-link">Burger Builder</Link>
                    </li>
                    {props.loggedIn ? uLinks.map((link, index) => {
                        return (
                            <li className="nav-item active" key={index}>
                                {link}
                            </li>
                        )
                    }) : nonULinks.map((link, index) => {
                        return (
                            <li className="nav-item active" key={index}>
                                {link}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button className="text-white" onClick={toggleDrawer(true)}
                data-toggle="collapse">
                <MenuIcon />
            </Button>
            <SwipeableDrawer
                anchor='right'
                open={state.sideDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}>
                <SideDrawer toggleDrawer={toggleDrawer}>
                    <List>
                        <ListItem button key='burger-builder' onClick={() => routingHandler('/burger-builder')}>
                            <ListItemText>
                                Burger Builder
                            </ListItemText>
                        </ListItem>
                        {props.loggedIn ? uLinks.map((link, index) => {
                            return (
                                <ListItem button key={index} onClick={() => routingHandler(link.props.to)}>
                                    {link.props.children}
                                </ListItem>
                            )
                        }) : nonULinks.map((link, index) => {
                            return (
                                <ListItem button key={index} onClick={() => routingHandler(link.props.to)}>
                                    {link.props.children}
                                </ListItem>
                            )
                        })}
                    </List>
                </SideDrawer>
            </SwipeableDrawer>
        </nav>
    );
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapActionsToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logOut())
    }
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(NavBar));