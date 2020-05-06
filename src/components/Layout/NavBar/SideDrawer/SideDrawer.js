import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

//SideDrawer to appear on right side while clicking hamburger icon

export default function SideDrawer(props) {
    const classes = useStyles();
    const list = (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={props.toggleDrawer(false)}
            onKeyDown={props.toggleDrawer(false)}
        >
            <List>
                <ListItem button key='burger-builder'>
                    <ListItemText primary='Burger Builder' />
                </ListItem>
                <ListItem button key='checkout'>
                    <ListItemText primary='Checkout' />
                </ListItem>
            </List>
        </div>
    );
    return list;
}