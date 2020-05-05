import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let input = null;
    switch (props.elementType) {
        case 'input': input = <input type={props.elementConfig.type}
            id={props.fieldName.toLocaleLowerCase()}
            className={"form-control " + (props.dirty && !props.valid ? classes.invalid : null)}
            placeholder={props.elementConfig.placeholder}
            value={props.elementConfig.value}
            onChange={(event) => props.onChange(event, props.fieldName.toLocaleLowerCase())}></input>
            break;
        case 'select': input = <select className={"form-control " + (props.dirty && !props.valid ? classes.invalid : null)}
            value={props.elementConfig.value} id={props.fieldName.toLocaleLowerCase()}
            onChange={(event) => props.onChange(event, props.fieldName.toLocaleLowerCase())}>
            {props.elementConfig.options.map(option => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            })}
        </select>
            break;
        case 'textarea': input = <textarea rows="5" cols="100" className={"form-control " + (props.dirty && !props.valid ? classes.invalid : null)}
            placeholder={props.elementConfig.placeholder}
            value={props.elementConfig.value}
            onChange={(event) => props.onChange(event, props.fieldName.toLocaleLowerCase())}>
        </textarea>
            break;
        default: input = <input type="text"></input>
    }

    return (
        <div className="row mt-3">
            <label htmlFor={props.fieldName.toLocaleLowerCase()} className="col-3"><sup className="text-danger">*</sup>{props.fieldName}</label>
            <div className="col-5">
                {input}
            </div>
        </div>
    );
}

export default input;