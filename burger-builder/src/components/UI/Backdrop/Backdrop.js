import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {
    //console.log(props.show);
return(
    props.show?
    <div className={classes.Backdrop} onClick={props.click}></div>
    :null
)
};

export default backdrop;