import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu'
import SideDrawer from './SideDrawer/SideDrawer'
import { Link } from 'react-router-dom';
const NavBar = (props) => {
    const [state, changeState] = useState({ sideDrawer: false });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        changeState({ sideDrawer: open });
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Burger Builder App</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to="/burger-builder" className="nav-link">Burger Builder</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/checkout" className="nav-link">Checkout</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/orders" className="nav-link">Orders</Link>
                    </li>
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
                onOpen={toggleDrawer(true)}
            >
                <SideDrawer toggleDrawer={toggleDrawer} />
            </SwipeableDrawer>
            {/* <div className="col-sm-6 text-right">
                <a href="#" className={classes.hyperlink + " mr-3 text-white"}>Burger Builder<span className="sr-only">(current)</span></a>
                <a href="#" className={classes.hyperlink + " mr-3 text-white"}>Order History</a>
            </div> */}
        </nav>
    );
}

export default NavBar;