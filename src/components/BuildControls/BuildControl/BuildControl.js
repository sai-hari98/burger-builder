import React, { Component } from 'react';
import classes from './BuildControl.module.css'

/**
 * Component to display controls for every ingredient
 */
class BuildControl extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.count !== nextProps.count;
    }

    componentDidUpdate() {
        console.log('BuildControl Update');
    }

    componentDidMount() {
        console.log('BuildControl Mount');
    }

    render() {
        return (
            <div className="row mt-2">
                <label className="col-6 text-center">{this.props.label}</label>
                <span className={classes.add + " col-1 text-center font-weight-bold"} onClick={this.props.add}>+</span>
                <label className="col-1 text-center">{this.props.count}</label>
                <span className={classes.remove + " col-1 text-center font-weight-bold"} onClick={this.props.remove}>-</span>
            </div>
        )
    }
}

export default BuildControl;