import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button  from '../../UI/Button/Button';
const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return (<li key = {igkey}>
                <span style={{textTransform: 'capitalize'}}>{igkey}</span>
                : {props.ingredients[igkey]}
                </li>);
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong> Total Price : {props.burgerPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" click={props.purchasecancel}>CANCEL</Button>
            <Button btnType="Success" click={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
    
};

export default orderSummary;