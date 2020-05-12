import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

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
            {props.children}
        </div>
    );
    return list;
}